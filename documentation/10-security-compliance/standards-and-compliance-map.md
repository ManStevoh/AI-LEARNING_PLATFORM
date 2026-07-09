# Standards And Compliance Map

## Purpose

This document maps global standards, security frameworks, privacy requirements, accessibility standards, and operational practices to concrete playbook artifacts for the AI Learning Platform.

The platform should not claim to be "world-class" without measurable standards. This map defines what "world-class" means in documentation, engineering, product quality, privacy, accessibility, and operations.

## Requirements Engineering

### ISO/IEC/IEEE 29148

Use for:

- stakeholder requirements,
- system requirements,
- software requirements,
- requirement attributes,
- requirement quality,
- validation,
- verification,
- traceability.

Required artifacts:

- stakeholder requirements specification,
- system requirements specification,
- software requirements specification,
- acceptance criteria,
- traceability matrix,
- glossary,
- assumptions and constraints,
- change-control process.

Application to this platform:

- Every module must define clear requirements.
- Every high-risk feature must define acceptance criteria.
- AI features must define measurable behavior, safety constraints, and evaluation criteria.
- Institution workflows must define role, permission, data, and reporting requirements.

## Software Quality

### ISO/IEC 25010

Use as the product quality model.

Quality attributes to document:

- functional suitability,
- performance efficiency,
- compatibility,
- usability,
- reliability,
- security,
- maintainability,
- portability.

Required artifacts:

- quality attribute rubric,
- non-functional requirements,
- performance targets,
- reliability targets,
- maintainability targets,
- portability requirements for web, mobile, desktop, and offline clients.

Application to this platform:

- "Fast" must become measurable latency targets.
- "Scalable" must become capacity and growth targets.
- "Secure" must become control requirements and evidence.
- "Accessible" must become WCAG acceptance criteria.

## Application Security

### OWASP ASVS 5.0

Use as the main application and API security verification baseline.

Target:

- ASVS Level 2 for production learner, institution, payment, and AI data.
- Higher scrutiny for payments, child data, admin, code execution, AI Gateway, and institution exports.

Required artifacts:

- ASVS control baseline,
- security acceptance criteria,
- security test plan,
- evidence checklist,
- versioned control references,
- release security gate.

### OWASP Top 10

Use for security awareness, secure coding training, and risk education.

Required artifacts:

- developer checklist,
- secure coding lessons,
- vulnerable code labs,
- code review checklist,
- remediation guide.

Application to this platform:

- The platform can also teach OWASP Top 10 as part of cybersecurity curriculum.

### OWASP SAMM

Use as the organizational secure development maturity model.

Required artifacts:

- secure SDLC maturity assessment,
- target maturity levels,
- governance process,
- metrics,
- security ownership model,
- recurring review cadence.

### NIST SSDF

Use for secure software development lifecycle governance.

Required artifacts:

- secure SDLC policy,
- developer training plan,
- protected source and release process,
- vulnerability intake,
- triage process,
- remediation process,
- root-cause analysis process,
- SBOM/provenance expectations.

## Accessibility

### WCAG 2.2

Target:

- WCAG 2.2 AA.

Required artifacts:

- accessibility policy,
- accessibility checklist,
- keyboard testing plan,
- screen reader smoke test plan,
- color contrast checklist,
- caption/transcript rules,
- accessible authentication requirements,
- reduced motion requirements,
- accessibility statement,
- remediation process.

Application to this platform:

- Learners, teachers, parents, and administrators must be able to use the system across ability levels.
- Coding tools, Blockly, dashboards, AI chat, forms, and billing flows must be accessible.

### WAI-ARIA APG

Use for accessible complex widget behavior.

Required artifacts:

- component accessibility requirements,
- keyboard interaction specs,
- focus behavior specs,
- accessible naming rules.

## API Standards

### OpenAPI 3.1

Use for versioned HTTP APIs.

Required artifacts:

- API style guide,
- `openapi.yaml`,
- error format standard,
- authentication schemes,
- versioning policy,
- deprecation policy,
- request/response examples,
- contract tests.

Application to this platform:

- Mobile, desktop, WhatsApp, sandbox workers, AI services, and partner integrations should use stable API contracts.

## Operations

### Twelve-Factor App

Use as deployment and runtime guidance.

Required artifacts:

- deployment playbook,
- environment configuration policy,
- dependency policy,
- backing services policy,
- build/release/run process,
- log handling standard,
- one-off admin task guidance,
- dev/staging/prod parity expectations.

### OpenTelemetry

Use for traces, metrics, and logs.

Required artifacts:

- observability architecture,
- trace naming standard,
- metric naming standard,
- log schema,
- dashboard requirements,
- alert rules.

Application to this platform:

- AI calls, code execution, payments, webhooks, queue jobs, and offline sync must be observable.

## Privacy And Education Compliance

### Kenya Data Protection Act And ODPC Guidance

Use as the first-country privacy baseline.

Required artifacts:

- Kenya privacy notice,
- controller/processor role mapping,
- ODPC registration assessment,
- data subject rights process,
- data inventory,
- retention policy,
- breach procedure,
- DPIA process,
- cross-border transfer review.

### GDPR

Use as a global privacy benchmark.

Required artifacts:

- lawful-basis register,
- privacy notice,
- consent records,
- data processing agreement,
- data subject access request workflow,
- deletion workflow,
- portability workflow,
- retention schedule,
- DPIA process,
- subprocessor register,
- breach response plan.

### FERPA

Relevant when serving covered U.S. educational institutions.

Required artifacts:

- FERPA addendum,
- school official language,
- legitimate educational interest language,
- disclosure logs,
- access/amendment workflow,
- redisclosure controls,
- data destruction terms.

### COPPA

Relevant when serving children under 13 or child-directed experiences.

Required artifacts:

- age-gating policy,
- child privacy notice,
- verifiable parental consent workflow,
- parent access/deletion workflow,
- data minimization rules,
- child data retention rules,
- third-party disclosure controls.

## Assurance And Enterprise Readiness

### SOC 2 Readiness

Use AICPA Trust Services Criteria as an enterprise readiness target.

Required artifacts:

- system description,
- control matrix,
- risk assessment,
- access review process,
- vendor management process,
- change management process,
- incident response plan,
- backup and disaster recovery evidence,
- logging and monitoring evidence,
- policy set,
- evidence calendar.

## Minimum Playbook Sections To Produce

The following documents should be created or expanded:

- 29148-based Product Requirements Document.
- ISO 25010 Quality Attribute Model.
- ASVS Security Control Matrix.
- Secure SDLC Playbook.
- WCAG 2.2 Accessibility Playbook.
- OpenAPI API Standards.
- Privacy And Data Protection Playbook.
- SOC 2 Readiness Playbook.
- Incident Response Playbook.
- Vendor And Subprocessor Register.
- AI Governance And Safety Playbook.
