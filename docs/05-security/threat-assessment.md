# G5 Threat Assessment
| Threat | Control |
|---|---|
| Direct state mutation from LAN | Removed whole-state API; server-side domain endpoints + session authz |
| Password exposure to browser state | Password hash only on server; HttpOnly session cookie |
| Concurrent scan/slot race | DB transaction, row locks on employee/process requirement, unique assignment invariant |
| Replay/duplicate scan | 60-second business duplicate + unique open attendance/assignment |
| Fingerprint spoof | device token compared timing-safe; raw template/image not persisted by endpoint |
| SQL injection | parameterized `pg` queries |
| XSS | escaping in frontend renderers + Helmet CSP |
| Error info leak | generic 500 response + request ID |
