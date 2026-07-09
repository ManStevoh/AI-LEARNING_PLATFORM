# Source-To-Decision Traceability

## Purpose

This document maps major platform decisions to supporting sources, rationale, status, and validation needs.

## Decision: Use PostgreSQL As Primary Database

Status: Accepted.

Decision record:

- `architecture/decisions/0001-use-postgresql-as-primary-database.md`

Supporting sources:

- PostgreSQL documentation: https://www.postgresql.org/docs/
- pgvector: https://github.com/pgvector/pgvector
- pgvector PGXN: https://pgxn.org/dist/vector

Evidence type:

- official product documentation.

Rationale:

- PostgreSQL supports relational integrity, JSONB, indexing, full-text search, and pgvector for early RAG.

Validation needed:

- performance test expected dashboard queries,
- benchmark pgvector for expected embedding volume,
- confirm hosting/ops readiness.

## Decision: Modular Monolith First

Status: Accepted.

Decision record:

- `architecture/decisions/0002-use-modular-monolith-first.md`

Supporting sources:

- Laravel documentation: https://laravel.com/docs
- Laravel Modules documentation: https://laravelmodules.com/docs/13/getting-started/introduction

Evidence type:

- official framework/package documentation plus architecture rationale.

Rationale:

- faster delivery, lower DevOps burden, easier transactions, clearer module boundaries than a traditional folder-by-type Laravel application.

Validation needed:

- enforce module boundaries in code review/static analysis,
- confirm team can maintain module discipline.

## Decision: Laravel + React + Inertia For First Web Version

Status: Recommended.

Supporting sources:

- Laravel documentation: https://laravel.com/docs
- Inertia documentation: https://inertiajs.com/
- React documentation: https://react.dev/

Evidence type:

- official product documentation.

Rationale:

- high development velocity, strong Laravel backend capabilities, React support for Blockly/Monaco/dashboard complexity.

Validation needed:

- prototype block coding workspace inside Inertia,
- confirm SSR/SEO needs for marketing pages,
- confirm mobile API requirements are not blocked.

## Decision: API-First Evolution

Status: Recommended.

Supporting sources:

- OpenAPI 3.1: https://spec.openapis.org/oas/latest.html
- Laravel Sanctum: https://laravel.com/docs/sanctum

Evidence type:

- official API/auth documentation.

Rationale:

- future Flutter, desktop, WhatsApp, sandbox workers, and integrations require stable APIs.

Validation needed:

- expand `api/openapi.yaml`,
- generate typed clients later.

## Decision: WCAG 2.2 AA Accessibility Target

Status: Recommended baseline.

Supporting sources:

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA APG: https://www.w3.org/WAI/ARIA/apg/

Evidence type:

- official W3C standards/guidance.

Rationale:

- education platform must serve learners with different abilities and comply with modern accessibility expectations.

Validation needed:

- accessibility audit,
- keyboard/screen reader tests,
- design system accessibility review.

## Decision: OWASP ASVS Level 2 Security Target

Status: Recommended baseline.

Supporting sources:

- OWASP ASVS: https://asvs.dev/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP SAMM: https://owaspsamm.org/

Evidence type:

- official OWASP standards.

Rationale:

- platform handles learner, child, institution, AI, payment, and code execution data.

Validation needed:

- create ASVS control matrix,
- perform threat model review,
- run security tests.

## Decision: Use Blockly For Visual Programming

Status: Recommended.

Supporting sources:

- Blockly documentation: https://developers.google.com/blockly

Evidence type:

- official product documentation.

Rationale:

- Blockly provides visual blocks, toolbox, serialization, custom blocks, and code generation foundation.

Validation needed:

- prototype Blockly + React integration,
- prototype stage runtime,
- test mobile/tablet usability.

## Decision: Monaco For Browser IDE

Status: Recommended for Level 4+.

Supporting sources:

- Monaco Editor: https://microsoft.github.io/monaco-editor/

Evidence type:

- official product documentation.

Rationale:

- strong web code editor foundation for professional coding environment.

Validation needed:

- lazy-load performance test,
- mobile usability decision,
- Vite worker setup.

## Decision: Knowledge Graph Curriculum Model

Status: Recommended strategic architecture.

Supporting sources:

- 1EdTech CASE: https://www.1edtech.org/standards/case
- IEEE Learning Metadata Terms: https://standards.ieee.org/ieee/2881/11719/
- Open Skills Network RSDs: https://www.openskillsnetwork.org/rsd
- Credential Engine CTDL: https://credentialengine.org/credential-transparency/ctdl/

Evidence type:

- standards plus educational knowledge graph research.

Rationale:

- skills, prerequisites, resources, assessments, projects, and careers need machine-readable relationships for adaptive learning and reporting.

Validation needed:

- author first 300-500 skills,
- test skill graph with Level 1 curriculum,
- validate teacher understanding of skill mastery reports.

## Decision: Learner Digital Twin

Status: Recommended with privacy safeguards.

Supporting sources:

- xAPI: https://standards.ieee.org/ieee/9274.1.1/7321/
- Caliper Analytics: https://www.1edtech.org/standards/caliper
- learner modeling research cited in `source-registry.md`.

Evidence type:

- learning analytics standards plus research.

Rationale:

- adaptive recommendations need evidence, skill states, misconceptions, preferences, and project history.

Validation needed:

- avoid black-box high-stakes decisions,
- pilot recommendation accuracy,
- privacy/legal review.

## Decision: Build An AI Operating System Layer

Status: Recommended strategic architecture.

Supporting sources:

- Laravel documentation: https://laravel.com/docs
- Laravel events: https://laravel.com/docs/12.x/events
- Laravel queues: https://laravel.com/docs/12.x/queues
- OpenAI function calling: https://platform.openai.com/docs/guides/function-calling
- Anthropic tool use: https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview
- Gemini function calling: https://ai.google.dev/gemini-api/docs/function-calling
- pgvector: https://github.com/pgvector/pgvector
- xAPI: https://standards.ieee.org/ieee/9274.1.1/7321/
- Caliper Analytics: https://www.1edtech.org/standards/caliper

Evidence type:

- official product documentation, learning analytics standards, and architecture recommendation.

Rationale:

- advanced AI learning products require context assembly, RAG, memory, tool execution, workflows, events, evaluation, and safety controls around the foundation model.

Validation needed:

- prototype AI Kernel with one Teacher Agent and one Coding Agent,
- evaluate tool-calling reliability,
- measure AI helpfulness and hallucination rate,
- benchmark cost per learning session,
- validate teacher trust in AI recommendations.

## Decision: Use A Learning Genome And Competency Engine

Status: Recommended strategic architecture.

Supporting sources:

- 1EdTech CASE: https://www.1edtech.org/standards/case
- xAPI: https://standards.ieee.org/ieee/9274.1.1/7321/
- Caliper Analytics: https://www.1edtech.org/standards/caliper
- IEEE Learning Metadata Terms: https://standards.ieee.org/ieee/2881/11719/
- Open Skills Network RSDs: https://www.openskillsnetwork.org/rsd
- Credential Engine CTDL: https://credentialengine.org/credential-transparency/ctdl/
- O*NET: https://www.onetonline.org/
- ESCO: https://esco.ec.europa.eu/en

Evidence type:

- standards, taxonomies, and strategic product architecture.

Rationale:

- adaptive learning, competency-based certificates, career guidance, teacher interventions, and AI personalization require evidence-based skill states rather than simple course completion.

Validation needed:

- define the first 100-300 competencies,
- map Level 1 content to competencies,
- compare teacher judgment to generated competency states,
- measure false mastery and false weakness rates,
- validate learner trust in competency recommendations.

## Decision: Evolve Toward An AI-Native Education Intelligence Platform

Status: Long-term strategic direction.

Supporting sources:

- Laravel documentation: https://laravel.com/docs
- OpenAPI 3.1: https://spec.openapis.org/oas/latest.html
- OpenAI function calling: https://platform.openai.com/docs/guides/function-calling
- Anthropic tool use: https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview
- Gemini function calling: https://ai.google.dev/gemini-api/docs/function-calling
- 1EdTech CASE: https://www.1edtech.org/standards/case
- xAPI: https://standards.ieee.org/ieee/9274.1.1/7321/
- Caliper Analytics: https://www.1edtech.org/standards/caliper
- O*NET: https://www.onetonline.org/
- ESCO: https://esco.ec.europa.eu/en

Evidence type:

- official technology documentation, standards, and strategic product architecture.

Rationale:

- a defensible AI education company needs more than chat. It needs intelligence infrastructure for twins, competency evidence, planning, workflows, trust, agent orchestration, marketplaces, and institutional analytics.

Validation needed:

- validate each advanced layer in phases,
- avoid launching high-complexity features before core learning outcomes are proven,
- measure business value and educational impact separately,
- perform privacy/security/legal review before twins, marketplaces, plugins, and federation.

## Decision: Managed Sandbox First For Code Execution

Status: Recommended for early launch.

Supporting sources:

- Docker security documentation: https://docs.docker.com/engine/security/
- Firecracker: https://firecracker-microvm.github.io/

Evidence type:

- official infrastructure/security documentation plus risk analysis.

Rationale:

- executing untrusted learner code is high risk; managed sandbox reduces early operational burden.

Validation needed:

- evaluate Judge0/E2B/other providers,
- cost benchmark,
- data/privacy review,
- abuse testing.

## Decision: Institution-First Go-To-Market

Status: Hypothesis.

Supporting sources:

- competitor/market research in `edtech-competitor-and-market-research.md`.

Evidence type:

- market analysis and founder context.

Rationale:

- institutions can bring many learners and value teacher support.

Validation needed:

- run 1-3 pilots,
- measure willingness to pay,
- validate teacher adoption,
- validate procurement process.

## Decision: Start With Level 1 Block Coding

Status: Recommended.

Supporting sources:

- Scratch/Blockly/Code.org patterns in market research,
- pedagogy framework in `curriculum-and-pedagogy-framework.md`.

Evidence type:

- product benchmarks plus computing education pedagogy.

Rationale:

- accessible entry point, strong fit for schools, visible project outcomes.

Validation needed:

- pilot learner engagement,
- teacher feedback,
- project completion rate.
