import bcrypt from 'bcryptjs';
import {pool} from './pool.js';
const password=process.env.SEED_ADMIN_PASSWORD;
if(!password) throw new Error('SEED_ADMIN_PASSWORD is required for seed');
if(password.length<12) throw new Error('SEED_ADMIN_PASSWORD must be at least 12 characters');
const h=await bcrypt.hash(password,12);
await pool.query(`insert into users(username,full_name,password_hash,role) values('admin','MPP Administrator',$1,'ADMIN') on conflict(username) do nothing`,[h]);
console.log('Admin seed checked. Remove SEED_ADMIN_PASSWORD from environment after first setup.');
await pool.end();
