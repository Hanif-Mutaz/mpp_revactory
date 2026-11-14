# Deployment
Runtime: Node.js 20+, PostgreSQL 15+. Recommended Windows service or systemd service based on server OS. Run migration before switching application version. Keep previous release directory and database recovery point.

Production environment variables are based on `.env.example`; secrets MUST NOT be committed.
