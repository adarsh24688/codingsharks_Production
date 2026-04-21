# [Project Name]

> Short one-line description of what this project does.

## Quick Start
```bash
make setup   # install deps + configure env + migrate DB
make dev     # start development server at localhost:3000
make test    # run test suite
make check   # full quality check before PR (typecheck + lint + test + audit)
```

## Documentation
| Topic | Location |
|-------|----------|
| Architecture & system design | `agent_docs/01-architecture.md` |
| Security & OWASP | `agent_docs/02-security.md` |
| API design & conventions | `agent_docs/03-api-design.md` |
| Database & caching | `agent_docs/04-database.md` |
| Performance & scaling | `agent_docs/05-performance.md` |
| Auth & RBAC | `agent_docs/06-auth.md` |
| Environment & secrets | `agent_docs/07-environment.md` |
| Build & deployment | `agent_docs/08-build-deploy.md` |
| Code conventions | `agent_docs/09-code-conventions.md` |
| Testing strategy | `agent_docs/10-testing.md` |
| Observability & monitoring | `agent_docs/11-observability.md` |
| Incident response | `agent_docs/12-incident-response.md` |
| API versioning | `agent_docs/13-api-versioning.md` |
| How to work in this repo | `agent_docs/HOW-TO-WORK.md` |
| Architecture decisions (ADRs) | `docs/adr/` |
| Contributing guide | `CONTRIBUTING.md` |
| Security policy | `SECURITY.md` |
| Token optimization (Claude Code) | `TOKEN-OPTIMIZATION.md` |

## Tech Stack
- **Runtime**: Node.js 20 + TypeScript (strict)
- **Framework**: Express
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Auth**: JWT + Role-Based Access Control
- **Testing**: Vitest + Supertest
- **CI/CD**: GitHub Actions

## Endpoints
- `GET /health` — liveness check
- `GET /ready` — readiness check
- `GET /metrics` — Prometheus metrics
- `GET /api/v1/...` — API routes (see API docs)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## Security
To report a vulnerability, see [SECURITY.md](SECURITY.md).
