import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';const sql=fs.readFileSync(new URL('../database/migrations/001_initial.sql',import.meta.url),'utf8');
test('schema protects EmpID equals barcode',()=>assert.match(sql,/CHECK\s*\(barcode=emp_id\)/i));
test('schema prevents two open attendance records for same employee',()=>assert.match(sql,/unique.*attendance|uq_.*attendance/is));
test('schema prevents duplicate active assignment per employee shift',()=>assert.match(sql,/uq_emp_assignment/i));
test('waiting FIFO index exists',()=>assert.match(sql,/idx_wait_fifo/i));
test('audit and scan event tables exist',()=>{assert.match(sql,/create table if not exists audit_log/i);assert.match(sql,/create table if not exists scan_events/i)});
