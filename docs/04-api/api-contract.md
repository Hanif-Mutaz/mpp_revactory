# API Contract
All `/api/*` routes except `/api/auth/login` require server-side session authentication. Mutation routes have role authorization.

Critical endpoints:
- POST `/api/auth/login`, POST `/api/auth/logout`, GET `/api/auth/me`
- POST `/api/attendance/check-in`, POST `/api/attendance/check-out`, GET `/api/attendance`
- GET/POST `/api/plans`
- GET/POST `/api/waiting/reconcile`
- CRUD/read: employees, skills, lines, approvals, absences, settings, audit
- GET `/api/reports/dashboard`
- Device routes under `/api/devices`
- Import request `/api/imports/excel` creates approval, it does not silently overwrite master data.
