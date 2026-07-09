# AI Learning Platform Engineering Playbook

This repository is the source of truth for the AI Learning Platform: a full-stack, AI-powered computing education ecosystem that takes learners from visual block coding to professional software engineering, cloud, AI, cybersecurity, robotics, and career readiness.

The repository is documentation-first. It is intended to support product strategy, investor conversations, engineering planning, curriculum design, security review, implementation, deployment, and future scaling across web, mobile, desktop, offline, and WhatsApp learning channels.

## Product Thesis

The platform should become a computing education operating system for learners, teachers, institutions, parents, administrators, NGOs, governments, and enterprise training programs.

The long-term learning path is:

```text
Level 1: Block coding with games and animations
Level 2: Blocks displayed beside generated JavaScript or Python
Level 3: Hybrid blocks and editable code
Level 4: Full browser coding environment with AI mentoring
Level 5: Real-world projects using Laravel, React or Next.js, Flutter, databases, APIs, cloud, DevOps, AI, and career preparation
```

## Documentation Principles

All major documentation in this repository must follow these principles:

- Evidence first: cite official documentation, standards, laws, peer-reviewed research, or high-quality industry sources where possible.
- Enterprise-grade by default: design for security, maintainability, accessibility, reliability, observability, and future scale.
- Education-first AI: AI should teach, scaffold, assess, and guide learners instead of simply giving answers.
- Institution-ready: schools, universities, bootcamps, NGOs, and governments must be first-class customers, not later add-ons.
- Offline-aware: web is first, but mobile, desktop, and offline synchronization must shape architecture from the beginning.
- Modular architecture: the system should grow as a platform of interoperable engines, not a single fragile application.

## Recommended Core Stack

The first production web version should use:

- Backend: Laravel, PHP, Redis, queues, Horizon, object storage, OpenAPI-documented APIs.
- Frontend: React, TypeScript, Inertia.js, Tailwind CSS, Vite.
- Primary database: PostgreSQL is recommended for the long-term platform because of advanced indexing, JSON capabilities, extensions, full-text search, and pgvector support for AI/RAG workloads.
- AI: multi-model AI gateway supporting OpenAI, Anthropic, Google Gemini, and later open-weight or private models.
- Coding education tools: Blockly, Monaco Editor, a 2D stage engine such as PixiJS or Phaser, and sandboxed code execution.
- Future apps: Flutter for mobile, Tauri or Flutter Desktop for desktop, offline storage with SQLite/IndexedDB, and background sync.

MySQL can support a strong early product, but PostgreSQL is the strategic default for this project because the product is expected to depend heavily on AI retrieval, analytics, JSON-heavy project data, and complex reporting.

## Repository Map

```text
documentation/
  00-executive/
  01-research/
  02-product/
  03-curriculum/
  04-architecture/
  05-ai/
  06-block-coding/
  07-ide-and-code-execution/
  08-institutions/
  09-ui-ux/
  10-security-compliance/
  11-infrastructure/
  12-business/
  13-roadmap/
architecture/
  decisions/
  diagrams/
api/
curriculum/
research/
security/
engineering/
```

## Current Status

This repository currently contains Version 0.1 of the documentation foundation. It should be expanded continuously into a full engineering playbook with product requirements, diagrams, research, architecture decisions, database design, API specifications, security controls, UI/UX guidance, curriculum, and implementation roadmaps.

## How To Use This Repository

Start with:

1. `documentation/README.md` for the documentation index.
2. `documentation/00-executive/product-vision.md` for the strategic vision.
3. `architecture/decisions/0001-use-postgresql-as-primary-database.md` for the first major technical decision.
4. `documentation/01-research/source-registry.md` for verified sources and research links.

## Documentation Standard

The playbook should align with global standards and practices including ISO/IEC/IEEE 29148, ISO/IEC 25010, OWASP ASVS, OWASP SAMM, WCAG 2.2, OpenAPI 3.1, secure software development practices, privacy-by-design, and modern cloud-native architecture.
