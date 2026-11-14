import express from 'express';import {allow} from '../../middleware/auth.js';import {asyncRoute,ok} from '../../utils/http.js';
export const backupRouter=express.Router();
backupRouter.post('/request',allow('ADMIN'),asyncRoute(async(req,res)=>ok(res,{accepted:true,mode:'EXTERNAL_PG_BACKUP',message:'Production backup dijalankan oleh PostgreSQL backup job/runbook; API tidak mengeksekusi shell command.'},202)));
