# Assumptions, Open Questions, And Validation Plan

## Purpose

This document lists assumptions and open questions that must be validated before the platform can be treated as commercially and operationally proven.

## Assumptions Requiring Validation

### A1: Schools Will Pay For AI Coding Education

Assumption:

- Kenyan schools and learning institutions will pay for a subscription if the platform saves teacher time and improves learner outcomes.

Risk if wrong:

- institutional go-to-market may be slower or require NGO/government sponsorship.

Validation:

- run paid or discounted pilots,
- interview school owners/admins,
- test annual seat pricing,
- measure conversion after pilot.

### A2: Teachers Will Use AI Tools

Assumption:

- teachers will use AI lesson planning, quiz generation, grading support, and dashboards.

Risk if wrong:

- platform becomes learner-only and loses institutional advantage.

Validation:

- observe teacher usage during pilot,
- measure weekly active teachers,
- interview teachers about saved time.

### A3: Level 1 Block Coding Is The Best Entry Point

Assumption:

- Level 1 block coding creates enough engagement and school value to start adoption.

Risk if wrong:

- schools may prefer teacher tools, exam prep, or digital literacy first.

Validation:

- compare pilot interest across block coding, teacher assistant, and AI tutor demos.

### A4: AI Mentor Improves Learning Experience

Assumption:

- learners will find AI mentor useful and teachers will trust it.

Risk if wrong:

- AI costs may not translate to retention or outcomes.

Validation:

- AI helpfulness ratings,
- reduction in repeated support questions,
- teacher review of AI answers,
- learner completion comparison.

### A5: PostgreSQL + pgvector Is Enough Initially

Assumption:

- early RAG and semantic search can run on PostgreSQL/pgvector.

Risk if wrong:

- vector search may require earlier dedicated infrastructure.

Validation:

- benchmark with realistic lesson/document embeddings,
- test tenant-scoped retrieval latency.

### A6: Managed Sandbox Is Best For Early Code Execution

Assumption:

- using a managed sandbox or Judge0-style setup is faster and safer for launch.

Risk if wrong:

- cost, latency, or customization may force self-hosting earlier.

Validation:

- provider evaluation,
- cost benchmark,
- malicious code tests,
- learner experience test.

### A7: Offline Support Is Important But Can Be Phased

Assumption:

- the first web version can launch online-first while architecture prepares for offline.

Risk if wrong:

- target schools may have connectivity constraints that block adoption.

Validation:

- survey pilot schools,
- measure internet/device reliability,
- test offline worksheet/PWA alternatives.

### A8: Institution-First Beats Individual-First

Assumption:

- selling to institutions is the best early business model.

Risk if wrong:

- procurement cycles may be slow; individual/family plans may be needed earlier.

Validation:

- compare school pilot conversion with direct learner signups,
- test parent pricing page,
- interview coding academies and NGOs.

## Open Product Questions

- Should Level 1 target ages 8-10 first or all beginners?
- Should generated code start with JavaScript only or JavaScript and Python?
- Should the first stage engine be PixiJS or Phaser?
- Should AI chat be available to children by default or controlled by teachers?
- What is the first paid plan and price?
- How much AI usage should each plan include?
- What should be available offline in the first mobile release?
- Which payment path should launch first: M-Pesa manual, M-Pesa API, or Stripe?
- Should certificates be issued in the first release or after pilots?

## Open Technical Questions

- Will `nwidart/laravel-modules` be used or a custom module structure?
- Which AI provider is first for pilot?
- Which sandbox provider is first?
- Which chart library becomes standard?
- How much OpenAPI should be generated from code vs handwritten?
- Should the platform use UUIDs or ULIDs consistently?
- How will module boundaries be enforced automatically?
- How will AI prompt evaluations run in CI?

## Open Compliance Questions

- What ODPC registration obligations apply to the company?
- What exact child consent workflow is needed for Kenya and future markets?
- What data processing agreement should schools sign?
- What retention period should apply to AI raw logs?
- What subprocessors will be used at launch?
- What parental access rights should be supported from day one?

## Validation Plan

### Phase 1: Interviews

Interview:

- school owners/admins,
- ICT teachers,
- coding academy founders,
- parents,
- learners,
- NGOs.

Goal:

- validate pain points, budget, adoption barriers, and must-have workflows.

### Phase 2: Prototype Tests

Test:

- learner dashboard,
- block coding workspace,
- AI mentor,
- teacher dashboard,
- institution dashboard.

Goal:

- validate usability before full build.

### Phase 3: Pilot

Run:

- 1-3 institutions,
- 50-300 learners,
- 6-8 weeks.

Measure:

- activation,
- retention,
- completion,
- AI helpfulness,
- teacher time saved,
- project completion,
- willingness to pay.

### Phase 4: Pricing Test

Test:

- per learner per term,
- annual institution plan,
- family plan,
- NGO cohort pricing.

Goal:

- find sustainable price that covers AI/support costs.

## Validation Evidence To Collect

- teacher interviews,
- learner feedback,
- parent/admin feedback,
- usage analytics,
- AI usage/cost,
- project completion data,
- subscription conversion,
- support tickets,
- technical incidents.

## Decision Rule

Do not scale sales or build advanced features until pilots prove:

- learners complete projects,
- teachers see value,
- institutions are willing to continue,
- AI cost is manageable,
- support burden is understood.
