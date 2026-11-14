# MPP Production Rebuild

Rebuild produksi Man Power Planner dengan Node.js/npm + PostgreSQL. Visual mengikuti `mpp_desktop_mockup.html`; navigation lama diganti sidebar dan URL per halaman.

## Quick start
1. Node.js 20+ dan PostgreSQL 15+.
2. `cp .env.example .env`, isi `DATABASE_URL`.
3. `npm install`
4. `npm run db:migrate`
5. `npm run seed`
6. `npm start`
7. Buka `http://localhost:5000/dashboard`.

Seed development membuat akun `admin` hanya bila `SEED_ADMIN_PASSWORD` di-set.

## Arsitektur
Modular monolith: Express API + PostgreSQL transaction boundaries + frontend route shell. Business-critical attendance/placement/waiting berada server-side, bukan localStorage.
