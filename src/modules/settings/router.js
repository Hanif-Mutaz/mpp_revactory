import express from 'express';
import {pool} from '../../db/pool.js';
import {allow} from '../../middleware/auth.js';
import {asyncRoute,ok,AppError} from '../../utils/http.js';
export const settingsRouter=express.Router();
settingsRouter.get('/',asyncRoute(async(_req,res)=>{const rows=(await pool.query('select key,value,updated_at from system_settings order by key')).rows;ok(res,Object.fromEntries(rows.map(x=>[x.key,x.value])))}));
settingsRouter.get('/:key',asyncRoute(async(req,res)=>{const q=await pool.query('select value,updated_at from system_settings where key=$1',[req.params.key]);if(!q.rowCount)throw new AppError(404,'SETTING_NOT_FOUND','Setting tidak ditemukan.');ok(res,q.rows[0].value)}));
settingsRouter.put('/:key',allow('ADMIN'),asyncRoute(async(req,res)=>{const q=await pool.query(`insert into system_settings(key,value,updated_by) values($1,$2,$3) on conflict(key) do update set value=excluded.value,updated_by=excluded.updated_by,updated_at=now() returning key,value,updated_at`,[req.params.key,JSON.stringify(req.body),req.user.id]);ok(res,q.rows[0])}));
