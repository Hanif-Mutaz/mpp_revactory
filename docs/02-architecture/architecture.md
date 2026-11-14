# Architecture

Browser -> Express modular monolith -> PostgreSQL.

Modules: auth, employees, skills, lines, planning, attendance, allocation, waiting, approvals, absences, devices, reports, settings, audit, import, backup request.

Critical write flow `check-in` executes inside one PostgreSQL transaction: employee lock -> stale attendance handling -> shift/work date -> duplicate guard -> attendance insert -> placement lock/check -> assignment OR waiting -> audit -> commit.

Frontend state is presentation state only. No production business truth is stored in localStorage; only sidebar preference is local.
