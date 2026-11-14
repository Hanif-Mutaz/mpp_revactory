# Access Control
Session cookie is HttpOnly/SameSite. Password is hashed with bcryptjs. Authorization is enforced by middleware `allow(...)` on mutation routes. Frontend menu visibility is convenience only and MUST NOT be treated as authorization.

Device token and scanner source must be server-owned. Secrets live only in environment configuration.
