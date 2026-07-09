# Research Methodology And Evidence Policy

## Purpose

This document defines how the AI Learning Platform documentation should separate verified facts, standards, recommendations, assumptions, and items requiring field validation.

The platform should be ambitious, but the documentation must not present guesses as facts.

## Evidence Categories

### Category A: Official Standards And Laws

Highest confidence.

Examples:

- ISO/IEC/IEEE standards,
- IEEE standards,
- W3C recommendations,
- OWASP standards,
- NIST publications,
- 1EdTech specifications,
- official government laws and regulator guidance,
- official product documentation from Laravel, PostgreSQL, W3C, OpenAPI, etc.

Use for:

- compliance requirements,
- security baselines,
- accessibility targets,
- API standards,
- privacy obligations,
- learning data interoperability.

### Category B: Official Product Documentation

High confidence for what a product or technology supports.

Examples:

- Laravel documentation,
- Inertia documentation,
- PostgreSQL documentation,
- pgvector documentation,
- Blockly documentation,
- Monaco documentation,
- Flutter documentation,
- Tauri documentation,
- Stripe documentation,
- WhatsApp Cloud API documentation.

Use for:

- technology capabilities,
- integration options,
- package selection,
- architectural feasibility.

### Category C: Peer-Reviewed Or Academic Research

High-to-medium confidence depending on context.

Examples:

- computing education research,
- adaptive learning research,
- knowledge graph research,
- learner modeling research,
- retrieval practice research,
- pair programming research.

Use for:

- pedagogy,
- learning science,
- adaptive learning design,
- assessment models.

### Category D: Credible Industry Analysis

Medium confidence.

Examples:

- Nielsen Norman Group UX research,
- reputable cloud/security/engineering blogs,
- market reports,
- major vendor whitepapers.

Use for:

- UX guidance,
- operational best practices,
- market patterns,
- implementation trade-offs.

### Category E: Strategic Recommendations

Reasoned but not factual until validated.

Examples:

- "start with PostgreSQL",
- "use modular monolith first",
- "pilot with 1-3 schools",
- "start with Level 1 block coding",
- "use managed sandbox first".

These must include rationale and trade-offs.

### Category F: Assumptions Requiring Validation

Not facts.

Examples:

- schools will pay a specific price,
- teachers will use AI lesson planning weekly,
- learners will complete Level 1 in a target time,
- AI mentor reduces teacher workload,
- low-bandwidth mode is enough for specific schools.

These must be tested through pilots and research.

## Required Citation Practice

Every document should cite sources when it claims:

- a standard requirement,
- legal/compliance requirement,
- product capability,
- educational research conclusion,
- market fact,
- technical limitation.

If no source exists, label the statement as:

- recommendation,
- assumption,
- hypothesis,
- open question,
- pilot validation item.

## Recommendation Format

Every major recommendation should include:

```text
Recommendation:
Rationale:
Supporting evidence:
Trade-offs:
Validation needed:
Decision status:
```

## Assumption Format

Every assumption should include:

```text
Assumption:
Why it matters:
Risk if wrong:
How to validate:
Owner:
Status:
```

## Pilot Validation

The following claims require field validation:

- willingness to pay,
- teacher time saved,
- learner engagement,
- AI mentor usefulness,
- curriculum fit,
- device/internet constraints,
- school onboarding complexity,
- parent interest,
- support workload,
- AI cost per learner.

## Documentation Quality Rules

- Do not use "global standard" unless a standard is named.
- Do not claim legal compliance without legal review.
- Do not claim "secure" without mapped controls.
- Do not claim "accessible" without WCAG criteria.
- Do not claim "AI-powered personalization works" without measured outcomes.
- Do not claim "school-ready" without pilot evidence.

## Review Cadence

Research and standards should be reviewed:

- quarterly for product decisions,
- before major architecture decisions,
- before legal/compliance claims,
- before investor materials,
- before school procurement documents.

## Definition Of Done

A research-backed document is complete when:

- factual claims have sources,
- recommendations have rationale,
- assumptions are labeled,
- validation items are tracked,
- open questions are listed,
- outdated sources are flagged for review.
