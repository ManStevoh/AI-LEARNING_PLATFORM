# AI Learning Platform Documentation

Owner: ACE Platform

Welcome to the AI Learning Platform documentation portal. This repository is the source of truth for a full-stack, AI-powered computing education ecosystem that takes learners from visual block coding to professional software engineering, cloud, AI, cybersecurity, robotics, and career readiness.

The platform is designed as an AI-native computing education operating system for learners, teachers, institutions, parents, administrators, NGOs, governments, and enterprise training programs.

## Primary Documents

| Document | Purpose |
| --- | --- |
| [Product Vision](documentation/00-executive/product-vision.md) | Strategic vision, market thesis, product direction, and long-term learning journey. |
| [Engineering Constitution](documentation/00-executive/engineering-constitution.md) | Non-negotiable engineering, security, AI, product, and delivery principles. |
| [Project Status Ledger](documentation/00-executive/project-status-ledger.md) | Completed work, developed artifacts, current state, and remaining implementation work. |
| [Last-Mile Execution Roadmap](documentation/13-roadmap/last-mile-execution-roadmap.md) | Practical build roadmap from foundation to production-scale platform. |
| [Documentation Index](documentation/README.md) | Full map of every documentation volume and supporting artifact. |

## Learning Progression

```text
Level 1: Block coding with games and animations
Level 2: Blocks displayed beside generated JavaScript or Python
Level 3: Hybrid blocks and editable code
Level 4: Full browser coding environment with AI mentoring
Level 5: Real-world projects using Laravel, React or Next.js, Flutter, databases, APIs, cloud, DevOps, AI, and career preparation
```

## Documentation Sections

| Area | What It Covers |
| --- | --- |
| [Executive](documentation/00-executive/product-vision.md) | Vision, governance, assumptions, pending work, status, and gap analysis. |
| [Research](documentation/01-research/source-registry.md) | Standards, source registry, market research, evidence policy, and validation plan. |
| [Product](documentation/02-product/product-requirements-document.md) | Product requirements, personas, feature catalogue, journeys, permissions, and entitlements. |
| [Curriculum](documentation/03-curriculum/curriculum-and-pedagogy-framework.md) | Computing pedagogy, knowledge graph, Level 1 to Level 5 learning paths, and Kenya CBC alignment. |
| [Architecture](documentation/04-architecture/system-overview.md) | Modular monolith, database, API standards, events, multi-tenancy, authentication, and offline sync. |
| [AI Platform](documentation/05-ai/ai-architecture.md) | AI Gateway, agents, RAG, tool registry, learner digital twin, Learning Genome, and AI governance. |
| [Block Coding](documentation/06-block-coding/block-coding-system.md) | Blockly strategy, block taxonomy, custom blocks, stage runtime, sprites, and generated code. |
| [IDE and Execution](documentation/07-ide-and-code-execution/code-execution-sandbox.md) | Browser IDE, Monaco, sandboxed code execution, grading, Git, and portfolio workflows. |
| [Institutions](documentation/08-institutions/institution-platform.md) | School, teacher, learner, parent, onboarding, operations, analytics, and institutional subscription flows. |
| [UI and UX](documentation/09-ui-ux/ui-ux-research-playbook.md) | Design system, dashboards, learner experience, AI mentor UX, accessibility, and workspace UX. |
| [Security](documentation/10-security-compliance/security-baseline.md) | OWASP ASVS, privacy, child safety, threat model, AI data handling, and compliance controls. |
| [Infrastructure](documentation/11-infrastructure/infrastructure-and-cicd.md) | Environments, CI/CD, deployment, observability, backups, cost management, and SLOs. |
| [Business](documentation/12-business/subscription-model.md) | Subscription model, pilots, institutional sales, pricing validation, and customer success. |
| [Roadmap](documentation/13-roadmap/master-roadmap.md) | Master roadmap, implementation backlog, sprint plan, pilot checklist, and production readiness. |

## Architecture and Engineering

| Artifact | Purpose |
| --- | --- |
| [Architecture Decisions](architecture/decisions/0001-use-postgresql-as-primary-database.md) | ADRs documenting major platform choices such as PostgreSQL, modular monolith, Blockly, AI Gateway, and offline readiness. |
| [Architecture Diagrams](architecture/diagrams/system-context.md) | Mermaid diagrams for system context, backend architecture, ERD, knowledge graph, digital twin, and AI kernel. |
| [OpenAPI Starter Contract](api/openapi.yaml) | Initial API contract foundation. |
| [Local Development](engineering/local-development.md) | Developer setup and local engineering workflow. |
| [Testing Strategy](engineering/testing-strategy.md) | Testing principles, levels, and quality expectations. |
| [Coding Standards](engineering/coding-standards.md) | Laravel, React, database, AI, and review standards. |
| [Application Foundation](application/README.md) | Laravel React/Inertia app foundation and local commands. |

## Recommended Core Stack

- Backend: Laravel, PHP, Redis, queues, Horizon, object storage, OpenAPI-documented APIs.
- Frontend: React, TypeScript, Inertia.js, Tailwind CSS, Vite.
- Database: PostgreSQL is recommended for long-term AI/RAG, JSON-heavy project data, analytics, full-text search, and pgvector.
- AI: multi-model AI Gateway supporting OpenAI, Anthropic, Google Gemini, and later open-weight or private models.
- Coding tools: Blockly, Monaco Editor, a 2D stage engine such as PixiJS or Phaser, and isolated code execution.
- Future clients: Flutter mobile, Tauri or Flutter Desktop, offline SQLite/IndexedDB storage, background sync, and WhatsApp learning.

MySQL can support a strong early product, but PostgreSQL is the strategic default because the platform is expected to depend heavily on AI retrieval, analytics, JSON-heavy project data, and complex reporting.

## Documentation Standard

The playbook should align with global standards and practices including ISO/IEC/IEEE 29148, ISO/IEC 25010, OWASP ASVS, OWASP SAMM, WCAG 2.2, OpenAPI 3.1, secure software development practices, privacy-by-design, and modern cloud-native architecture.
