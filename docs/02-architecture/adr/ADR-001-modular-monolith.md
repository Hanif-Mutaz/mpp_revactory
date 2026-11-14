# ADR-001 Modular Monolith
Status: Accepted

## Context
Internal supporting production system; multi-client shared PostgreSQL; strong consistency is more important than independent deployment.

## Decision
Node.js Express modular monolith with PostgreSQL. No microservices, Redis, queue, Docker, or Kubernetes required by default.

## Consequence
Simple deployment and transaction boundaries. Modules must access shared database only through explicit domain services/contracts.
