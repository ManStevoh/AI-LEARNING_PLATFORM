# Source Registry

This registry tracks sources used to justify product, architecture, education, security, accessibility, privacy, and business decisions. The goal is to make the documentation evidence-based and reviewable.

## Requirements And Quality Standards

### ISO/IEC/IEEE 29148

- Official ISO page: https://www.iso.org/standard/72089.html
- IEEE page: https://standards.ieee.org/ieee/29148/6937/

Use this standard as the baseline for stakeholder requirements, system requirements, software requirements, requirement quality, traceability, validation, and verification.

Documentation impact:

- Requirements should be uniquely identifiable.
- Requirements should be clear, feasible, necessary, implementation-independent where appropriate, and testable.
- Stakeholder requirements, system requirements, software requirements, constraints, assumptions, and acceptance criteria should be separated.

### ISO/IEC 25010

- ISO overview: https://iso25000.com/index.php/en/iso-25000-standards/iso-25010

Use this standard as a quality model for product quality and quality in use.

Documentation impact:

- Non-functional requirements should explicitly cover functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, and portability.
- Education-specific quality goals should map to measurable platform capabilities such as uptime, learning continuity, offline availability, accessibility, latency, and assessment integrity.

## Security Standards

### OWASP Application Security Verification Standard

- Official ASVS site: https://asvs.dev/
- GitHub repository: https://github.com/OWASP/ASVS

OWASP ASVS 5.0.0 is the current stable application security verification baseline. It should guide technical security requirements for web applications and APIs.

Documentation impact:

- The security baseline should use ASVS Level 2 as the default target for production institutional and learner data.
- Higher-risk modules such as payments, child data, institution administration, AI model gateway, and code execution should receive stricter controls.
- Security requirements must be testable, not just aspirational.

### OWASP Top 10

- Official project: https://owasp.org/www-project-top-ten/

Use as a high-level risk awareness framework, not as the complete security standard.

Documentation impact:

- Security testing and training should address broken access control, injection, cryptographic failures, insecure design, security misconfiguration, vulnerable components, identification and authentication failures, software and data integrity failures, logging failures, and SSRF.

### OWASP SAMM

- Official project: https://owaspsamm.org/

Use as a software security maturity model for governance, design, implementation, verification, and operations.

Documentation impact:

- The engineering playbook should include maturity targets for secure development over time.

## Accessibility Standards

### WCAG 2.2

- W3C Recommendation: https://www.w3.org/TR/WCAG22/
- WAI overview: https://www.w3.org/WAI/standards-guidelines/wcag/

WCAG 2.2 is the recommended accessibility target for the web product.

Documentation impact:

- UI/UX requirements should target WCAG 2.2 AA as the default.
- The product should support keyboard navigation, sufficient contrast, focus management, semantic markup, captions/transcripts for media, accessible forms, accessible dashboards, and reduced cognitive load.
- Accessibility matters especially because the platform will serve children, adults, schools, rural users, multilingual users, and learners with disabilities.

### WAI-ARIA Authoring Practices Guide

- Official guide: https://www.w3.org/WAI/ARIA/apg/
- Patterns: https://www.w3.org/WAI/ARIA/apg/patterns/

Use APG as implementation guidance for accessible complex components such as dialogs, tabs, accordions, menus, grids, comboboxes, tree views, sliders, and toolbars.

Documentation impact:

- Complex UI components should document keyboard interaction and focus behavior.
- Custom controls must provide accessible names, states, and descriptions.
- Component implementation should prefer native HTML first and ARIA only where needed.

## UX And Design System References

### Nielsen Norman Group Usability Heuristics

- Official article: https://www.nngroup.com/articles/ten-usability-heuristics/

Use the 10 usability heuristics as a baseline for evaluating learner, teacher, institution, admin, AI, coding, and billing experiences.

Documentation impact:

- Product flows must show system status.
- Users need control, undo, retry, and recovery paths.
- Interfaces should reduce recall burden.
- Error states should be useful and actionable.
- Complex dashboards and coding workflows should remain consistent and minimal.

### Apple Human Interface Guidelines

- Official design resources: https://developer.apple.com/design/human-interface-guidelines/
- Design pathway: https://developer.apple.com/design/pathway/

Use as a reference for premium polish, clarity, platform conventions, accessibility, typography, layout, and motion.

Documentation impact:

- Future mobile and desktop apps should respect platform conventions.
- Motion and visual hierarchy should support usability, not decoration.

### Material Design 3

- Android Material 3 guide: https://developer.android.com/develop/ui/compose/designsystems/material3
- Material theming codelab: https://developer.android.com/codelabs/m3-design-theming

Use as a reference for token-based systems, semantic color roles, typography, shape, motion, and accessible theming.

Documentation impact:

- The platform should define semantic tokens for color, typography, spacing, radius, and motion.
- Light and dark themes should be token-driven.

### IBM Carbon Design System

- Main site: https://carbondesignsystem.com/
- Data visualization: https://carbondesignsystem.com/data-visualization/getting-started/

Use as a reference for enterprise-grade dashboards, accessible data visualization, and reusable component governance.

Documentation impact:

- Analytics must include labels, legends, accessible colors, data tables or export alternatives, and decision-focused layouts.

### Shopify Polaris

- Foundations: https://polaris-react.shopify.com/foundations
- Accessibility: https://polaris-react.shopify.com/foundations/accessibility

Use as a reference for admin SaaS UX, accessibility, internationalization, information architecture, billing/settings flows, and component reuse.

Documentation impact:

- Institution dashboards, billing, settings, filters, and bulk actions should use calm, predictable admin patterns.

### Monaco Editor Accessibility

- Accessibility guide: https://github.com/microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide
- Integrator guide: https://github.com/microsoft/monaco-editor/wiki/Accessibility-Guide-for-Integrators
- API typedoc: https://microsoft.github.io/monaco-editor/typedoc/

Use as the accessibility reference for browser IDE integration.

Documentation impact:

- Browser IDE implementation should configure Monaco accessibility support deliberately.
- Code editor surfaces need clear ARIA labels, keyboard guidance, and product accessibility documentation.

## API And Integration Standards

### OpenAPI 3.1

- Specification: https://spec.openapis.org/oas/latest.html

Use OpenAPI 3.1 for all public and mobile-facing APIs.

Documentation impact:

- APIs should have versioned contracts.
- Mobile, desktop, WhatsApp, and partner integrations should consume stable documented APIs.
- API schemas should be generated, reviewed, and tested.

### Meta WhatsApp Cloud API

- Overview: https://developers.facebook.com/docs/whatsapp/cloud-api/
- Messages API: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages

Use as the official reference for future WhatsApp learning, notifications, and conversational support.

Documentation impact:

- WhatsApp learning requires Graph API integration, webhooks, message templates where required, opt-in/consent handling, and privacy review.

### Safaricom Daraja M-Pesa API

- Developer portal: https://developer.safaricom.co.ke/
- Safaricom M-PESA business API overview: https://www.safaricom.co.ke/main-mpesa/m-pesa-for-you/helpful-m-pesa-channels

Use as the official reference for Kenya-first M-Pesa payments.

Documentation impact:

- Billing should support asynchronous payment callbacks, transaction reconciliation, sandbox testing, and secure credential handling.

### 1EdTech CASE

- Standard page: https://www.1edtech.org/standards/case
- Specification: https://www.imsglobal.org/spec/case/v1p1

Use Competencies and Academic Standards Exchange as a reference for machine-readable competencies, academic standards, skills, rubrics, and associations.

Documentation impact:

- The Computing Knowledge Graph should support standards, competencies, skills, and framework associations.
- Future curriculum import/export should consider CASE-like identifiers and relationships.

### xAPI

- IEEE standard page: https://standards.ieee.org/ieee/9274.1.1/7321/
- ADL specification repository: https://github.com/adlnet/xAPI-Spec

Use xAPI as a reference for learning experience statements and Learning Record Store concepts.

Documentation impact:

- Learning events should be modeled consistently so future interoperability with learning analytics systems is possible.
- Offline and non-browser learning experiences should be trackable.

### 1EdTech Caliper Analytics

- Standard page: https://www.1edtech.org/standards/caliper
- Implementation guide: https://www.imsglobal.org/spec/caliper/v1p2/impl

Use Caliper as a reference for structured learning activity analytics.

Documentation impact:

- Learner, teacher, institution, assessment, and resource activity events should use a consistent vocabulary.
- Dashboards should be built from meaningful learning events, not only page views.

### IEEE Learning Metadata Terms

- IEEE 2881 page: https://standards.ieee.org/ieee/2881/11719/

Use as a reference for linked-data-oriented learning resource and learning event metadata.

Documentation impact:

- Lessons, labs, assessments, events, and resources should carry metadata that supports search, reuse, alignment, and AI retrieval.

### Rich Skill Descriptors And CTDL

- Open Skills Network RSDs: https://www.openskillsnetwork.org/rsd
- Credential Engine CTDL: https://credentialengine.org/credential-transparency/ctdl/

Use Rich Skill Descriptors and CTDL/CTDL-ASN as references for machine-readable skill definitions and education-to-employment alignment.

Documentation impact:

- Platform skills should include clear statements, context, evidence, alignments, career relevance, and machine-readable metadata.

### O*NET

- Official site: https://www.onetonline.org/
- O*NET Web Services: https://services.onetcenter.org/

Use O*NET as one authoritative occupational information reference for skills, abilities, knowledge areas, tasks, and career mapping.

Documentation impact:

- Career paths should map platform competencies to occupational skill requirements where relevant.
- Career recommendations should distinguish demonstrated learner evidence from external labor-market references.

### ESCO

- Official site: https://esco.ec.europa.eu/en

Use ESCO as a reference taxonomy for occupations, skills, competences, and qualifications.

Documentation impact:

- The career graph can support international skill/occupation alignment.
- The industry connector should treat external taxonomies as references, not as automatic curriculum truth.

### Kenya Institute Of Curriculum Development

- KICD official site: https://kicd.ac.ke/
- CBC materials: https://kicd.ac.ke/cbc-materials/

Use KICD as the official Kenya curriculum source for CBC/CBE alignment.

Documentation impact:

- Kenya curriculum alignment must map platform skills and lessons to official KICD curriculum designs where relevant.
- Alignment claims should be reviewed by curriculum specialists and not treated as official endorsement unless formally approved.

## Architecture And Operations

### Twelve-Factor App

- Official site: https://12factor.net/

Use as a baseline for deployable service design.

Documentation impact:

- Configuration should live in environment variables.
- Backing services should be attached resources.
- Build, release, and run stages should be separated.
- Logs should be treated as event streams.

### OpenTelemetry

- Official site: https://opentelemetry.io/

Use as the observability standard for traces, metrics, and logs across services.

Documentation impact:

- AI calls, queue jobs, code execution, payments, authentication, and learner workflows should be observable.
- Trace IDs should connect frontend actions, backend APIs, queue jobs, AI gateway calls, and sandbox execution.

## AI And Retrieval

### pgvector

- GitHub repository: https://github.com/pgvector/pgvector
- PGXN package: https://pgxn.org/dist/vector

pgvector provides vector similarity search inside PostgreSQL, supporting exact and approximate nearest-neighbor search with index types such as HNSW and IVFFlat.

Documentation impact:

- PostgreSQL can serve as both the primary relational database and an early vector search store.
- Separate vector infrastructure can be introduced later if scale or specialized retrieval requirements justify it.
- Course content, curriculum mappings, lesson chunks, code examples, rubrics, and help articles can be embedded for RAG.

### OpenAI Tool Calling And Structured Outputs

- Function calling guide: https://platform.openai.com/docs/guides/function-calling
- Structured outputs guide: https://platform.openai.com/docs/guides/structured-outputs

Use as one official reference for model tool/function calling and schema-constrained responses.

Documentation impact:

- AI tools should be defined with schemas.
- Laravel should execute tools server-side after permission checks.
- Structured outputs should be used for quizzes, rubrics, code review findings, recommendations, and workflow steps.

### Anthropic Tool Use

- Tool use documentation: https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview

Use as an official reference for provider-supported tool use patterns.

Documentation impact:

- AI Gateway provider adapters should normalize different provider tool-calling formats.
- Agent orchestration must not depend on one vendor's API shape.

### Google Gemini Function Calling

- Function calling documentation: https://ai.google.dev/gemini-api/docs/function-calling

Use as an official reference for Gemini function calling.

Documentation impact:

- Multi-model strategy should support function/tool calling across providers where possible.
- Provider capability checks are required before routing tool-heavy tasks to a model.

### OpenAI Evaluations

- Evals guide: https://platform.openai.com/docs/guides/evals

Use as one reference for AI output evaluation workflows.

Documentation impact:

- AI features should include evaluation sets for factuality, safety, pedagogy, tool-use correctness, and output format.
- Prompt changes should be tested before production release.

## Core Product Technologies

### Laravel

- Official documentation: https://laravel.com/docs

Use Laravel as the first backend framework because it is productive, mature, secure when used correctly, and aligned with the founder's experience.

Documentation impact:

- Laravel should be used as a modular monolith first.
- Laravel should expose API-ready capabilities for web, mobile, desktop, WhatsApp, and partner integrations.
- Laravel queues, events, policies, notifications, scheduling, testing, and service container features should be treated as core backend infrastructure.

### Laravel Events

- Official documentation: https://laravel.com/docs/12.x/events

Use Laravel events to decouple side effects between modules.

Documentation impact:

- Domain events such as `LessonCompleted`, `AssignmentSubmitted`, and `SubscriptionRenewed` should trigger queued listeners for analytics, notifications, gamification, AI memory, and certificates.

### Laravel Sanctum

- Official documentation: https://laravel.com/docs/11.x/sanctum

Use Sanctum for first-party SPA authentication and token authentication for mobile, desktop, and simple API clients.

Documentation impact:

- First-party web/SPAs should use cookie-based session authentication.
- Mobile and desktop clients should use bearer tokens with device-level revocation and abilities/scopes.

### Laravel Horizon

- Official documentation: https://laravel.com/docs/11.x/horizon

Use Horizon to monitor and configure Redis-backed Laravel queues.

Documentation impact:

- AI generation, grading, code execution, media processing, reports, notifications, imports, exports, and billing reconciliation should run in queues.
- Horizon requires Redis queues and should be protected in production.

### Laravel Octane

- Official documentation: https://laravel.com/docs/13.x/octane

Use Octane later when profiling proves the need for long-lived worker performance.

Documentation impact:

- Do not introduce Octane before auditing packages and code for long-lived process safety.
- FrankenPHP, RoadRunner, and Swoole/OpenSwoole are supported options.

### Laravel Modules

- Documentation: https://laravelmodules.com/docs/13/getting-started/introduction

Use `nwidart/laravel-modules` only if the team wants scaffolding for modular Laravel applications.

Documentation impact:

- The package can organize code into modules, but it does not enforce strict boundaries. Architecture rules, reviews, static analysis, and tests must enforce boundaries.

### Spatie Laravel Permission

- Documentation: https://spatie.be/docs/laravel-permission
- Teams permissions: https://spatie.be/docs/laravel-permission/v8/basic-usage/teams-permissions

Use for roles and permissions, with team/tenant scoping evaluated for institution-based access control.

Documentation impact:

- Authorization should combine tenant context, roles, permissions, policies, feature flags, subscription entitlements, and usage limits.

### Inertia.js

- Official documentation: https://inertiajs.com/
- Server-side rendering: https://inertiajs.com/server-side-rendering

Use Inertia.js with React for the first web application to move quickly while retaining Laravel routing, controllers, policies, validation, and server-side productivity.

### React

- Official documentation: https://react.dev/

Use React and TypeScript for complex UI surfaces including Blockly, dashboards, Monaco Editor, analytics, and AI interfaces.

### Tailwind CSS

- Official documentation: https://tailwindcss.com/docs

Use Tailwind CSS as the utility-first styling foundation connected to the platform's design tokens.

### shadcn/ui

- Official documentation: https://ui.shadcn.com/

Use shadcn/ui as a practical starting point for owned React/Tailwind components. Components should be committed into the platform codebase and evolved into the AI Learning Design System.

### Radix UI

- Official documentation: https://www.radix-ui.com/primitives
- Accessibility overview: https://www.radix-ui.com/primitives/docs/overview/accessibility

Use Radix primitives for accessible unstyled React components such as dialogs, dropdowns, popovers, tabs, tooltips, sliders, and menus.

### React Aria

- Official documentation: https://react-aria.adobe.com/

Use React Aria for advanced accessible interactions, adaptive behavior, internationalized components, and cases where lower-level accessibility control is required.

### TanStack Table

- Official documentation: https://tanstack.com/table/latest

Use TanStack Table for institution, teacher, admin, analytics, billing, audit, and learner roster data grids where custom styling and server-driven state are required.

### Blockly

- Official documentation: https://developers.google.com/blockly
- GitHub repository: https://github.com/google/blockly

Use Blockly as the foundation for visual programming. Blockly provides the workspace, toolbox, blocks, serialization, and code generation foundation, but the platform must build its own stage, runtime, sprites, project model, AI feedback, curriculum, and institutional features.

### Monaco Editor

- GitHub repository: https://github.com/microsoft/monaco-editor

Use Monaco Editor for the browser coding environment and the transition from generated code to editable professional code.

### Flutter

- Official documentation: https://docs.flutter.dev/

Use Flutter for mobile apps when the platform expands beyond web, especially because it supports cross-platform development and offline-first experiences.

### Tauri

- Official documentation: https://tauri.app/

Consider Tauri for the desktop app because it can produce smaller, more secure desktop applications than typical Electron builds, while still allowing web technologies for UI.

## Privacy And Regional Compliance

### Kenya Office of the Data Protection Commissioner

- Official site: https://www.odpc.go.ke/
- ODPC functions: https://www.odpc.go.ke/functions-of-the-office/
- ODPC FAQs: https://www.odpc.go.ke/faqs/
- Kenya Data Protection Act reference: https://natlex.ilo.org/dyn/natlex2/r/natlex/fe/details?p3_isn=109333

Use Kenya's data protection requirements as a first-country compliance baseline.

Documentation impact:

- Learner data, child data, school data, AI conversation logs, assessment records, and analytics require privacy-by-design.
- Institutional agreements should define data roles, retention, consent, access controls, and deletion workflows.
- The platform must evaluate ODPC registration obligations, controller/processor roles, data subject rights, child data handling, privacy notices, and institutional data processing agreements.

### GDPR

- EU overview: https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en

Use GDPR principles as a global privacy benchmark even before entering the EU market.

Documentation impact:

- Include lawful basis, minimization, access rights, deletion, portability, privacy notices, data processing agreements, and processor/subprocessor controls.

## Research Backlog

The following areas require deeper research before final requirements are locked:

- Kenya CBC and TVET computing curriculum references.
- Country-by-country data protection requirements for East African expansion.
- Age-based consent and child safety requirements in target markets.
- Code execution sandbox providers and isolation models.
- AI safety requirements for child learners.
- Low-bandwidth and offline learning evidence in African education contexts.
- Institutional procurement patterns for Kenyan schools, universities, NGOs, and bootcamps.
- M-Pesa business payment APIs, recurring billing support, and reconciliation requirements.
