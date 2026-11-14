import express from 'express';
import {pool,tx} from '../../db/pool.js';
import {allow} from '../../middleware/auth.js';
import {asyncRoute,ok,AppError} from '../../utils/http.js';
export const linesRouter=express.Router();
linesRouter.get('/',asyncRoute(async(_req,res)=>{const q=await pool.query(`select l.line_id,l.department,l.active,coalesce(json_agg(json_build_object('process',p.process,'required',p.required_count) order by p.process) filter(where p.id is not null),'[]') processes from lines l left join line_processes p on p.line_id=l.line_id group by l.line_id order by l.line_id`);ok(res,q.rows)}));
linesRouter.post('/',allow('ADMIN'),asyncRoute(async(req,res)=>{const x=req.body||{};if(!x.lineId||!x.department)throw new AppError(400,'INVALID_LINE','lineId dan department wajib.');const out=await tx(async c=>{await c.query(`insert into lines(line_id,department) values($1,$2) on conflict(line_id) do update set department=excluded.department`,[x.lineId,x.department]);await c.query('delete from line_processes where line_id=$1',[x.lineId]);for(const p of x.processes||[]){if(!p.process||Number(p.required)<0)throw new AppError(400,'INVALID_PROCESS','Process/required tidak valid.');await c.query('insert into line_processes(line_id,process,required_count) values($1,$2,$3)',[x.lineId,String(p.process).toUpperCase(),Number(p.required)])}return{lineId:x.lineId}});ok(res,out,201)}));
