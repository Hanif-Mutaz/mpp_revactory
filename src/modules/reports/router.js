import express from 'express';
import { pool } from '../../db/pool.js';
import { asyncRoute, ok } from '../../utils/http.js';
import { workDateISO, shiftContext } from '../../utils/time.js';

export const reportsRouter = express.Router();

reportsRouter.get(
  '/dashboard',
  asyncRoute(async (req, res) => {
    const now = new Date();

    const shiftResult = await pool.query(`
      SELECT
        shift_code,
        start_time,
        end_time,
        scan_open_minutes,
        scan_close_minutes,
        late_after_minutes
      FROM shifts
      WHERE active = TRUE
      ORDER BY start_time
    `);

    const fallback = shiftContext(now, shiftResult.rows);

    const workDate =
      req.query.date ||
      fallback?.workDate ||
      workDateISO(now);

    const shiftCode = String(
      req.query.shift ||
      fallback?.shiftCode ||
      '1'
    );

    const requirementResult = await pool.query(
      `
      SELECT
        l.line_id,
        l.department,
        p.process,
        p.required_count
      FROM daily_plans d
      JOIN daily_plan_lines dl
        ON dl.plan_id = d.id
      JOIN lines l
        ON l.line_id = dl.line_id
      JOIN line_processes p
        ON p.line_id = l.line_id
      WHERE
        d.work_date = $1
        AND d.shift_code = $2
      ORDER BY
        l.line_id,
        p.process
      `,
      [workDate, shiftCode]
    );

    const assignmentResult = await pool.query(
      `
      SELECT
        a.line_id,
        a.process,
        a.emp_id,
        e.name
      FROM assignments a
      JOIN employees e
        ON e.emp_id = a.emp_id
      WHERE
        a.work_date = $1
        AND a.shift_code = $2
        AND a.active = TRUE
      ORDER BY
        a.line_id,
        a.process,
        a.created_at
      `,
      [workDate, shiftCode]
    );

    const waitingResult = await pool.query(
      `
      SELECT
        w.emp_id,
        e.name,
        w.waiting_since,
        w.reason
      FROM waiting_queue w
      JOIN employees e
        ON e.emp_id = w.emp_id
      WHERE
        w.work_date = $1
        AND w.shift_code = $2
      ORDER BY
        w.waiting_since,
        w.attendance_id
      `,
      [workDate, shiftCode]
    );

    const attendanceResult = await pool.query(
      `
      SELECT
        COUNT(*)::int AS present,
        COUNT(*) FILTER (
          WHERE waiting = TRUE
        )::int AS waiting,
        COUNT(*) FILTER (
          WHERE late = TRUE
        )::int AS late
      FROM attendance
      WHERE
        work_date = $1
        AND shift_code = $2
      `,
      [workDate, shiftCode]
    );

    const lineMap = new Map();

    for (const row of requirementResult.rows) {
      let line = lineMap.get(row.line_id);

      if (!line) {
        line = {
          line_id: row.line_id,
          department: row.department,
          required: {},
          assignments: [],
          gap: 0
        };

        lineMap.set(row.line_id, line);
      }

      line.required[row.process] = Number(row.required_count);
    }

    for (const assignment of assignmentResult.rows) {
      const line = lineMap.get(assignment.line_id);
      if (line) {
        line.assignments.push(assignment);
      }
    }

    let totalGap = 0;

    for (const line of lineMap.values()) {
      line.gap = Object.entries(line.required).reduce(
        (gap, [process, requiredCount]) => {
          const assigned = line.assignments.filter(
            item => item.process === process
          ).length;

          return gap + Math.max(0, requiredCount - assigned);
        },
        0
      );

      totalGap += line.gap;
    }

    const attendance = attendanceResult.rows[0];

    ok(res, {
      date: workDate,
      shift: shiftCode,
      summary: {
        present: attendance.present,
        assigned: assignmentResult.rows.length,
        waiting: attendance.waiting,
        late: attendance.late,
        gap: totalGap,
        activeLines: lineMap.size
      },
      lines: Array.from(lineMap.values()),
      waiting: waitingResult.rows
    });
  })
);
