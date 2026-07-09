# AI Governance And Safety

## Purpose

This document defines governance and safety requirements for AI features in the platform.

The platform will serve learners, children, teachers, institutions, parents, and administrators. AI must be useful, safe, explainable where possible, auditable, cost-controlled, and aligned with learning goals.

## AI Governance Principles

- AI should teach, not simply answer.
- AI should scaffold before solving.
- AI should respect learner age and context.
- AI should protect privacy.
- AI should be observable and auditable.
- AI-generated curriculum must be reviewed before becoming canonical.
- AI decisions affecting learners should be explainable.
- High-stakes decisions require human oversight.

## AI Gateway Requirement

All AI calls must go through the AI Gateway.

No module should call OpenAI, Anthropic, Gemini, or other providers directly.

The AI Gateway handles:

- model routing,
- prompt versioning,
- safety checks,
- RAG retrieval,
- cost tracking,
- logging,
- output validation,
- tenant policies,
- fallbacks,
- evaluation.

## Model Routing Policy

Model selection should consider:

- task type,
- learner age,
- data sensitivity,
- required reasoning quality,
- latency,
- cost,
- institution policy,
- provider availability.

Example:

- simple explanation: low-cost model,
- advanced code review: stronger code/reasoning model,
- child tutoring: stricter safety route,
- graded assessment feedback: structured output model with integrity rules,
- private institution content: provider allowed by institution policy.

## Prompt Governance

Every production prompt must have:

- prompt ID,
- version,
- owner,
- purpose,
- input schema,
- output schema,
- safety rules,
- allowed context,
- disallowed behavior,
- examples,
- evaluation tests,
- change history.

Prompt changes should be reviewed for:

- safety,
- correctness,
- cost,
- pedagogy,
- privacy.

## AI Safety Rules For Learners

AI must:

- use age-appropriate language,
- avoid harmful content,
- avoid sexual, violent, exploitative, or unsafe guidance,
- encourage help-seeking where needed,
- avoid bullying or shaming,
- respect cultural context,
- avoid overclaiming emotional understanding,
- avoid pretending to be human.

## Assessment Integrity

During graded work, AI should:

- give hints,
- explain concepts,
- ask guiding questions,
- suggest debugging strategies,
- reference relevant lessons.

AI should not:

- provide full final answers,
- complete the entire assignment,
- bypass tests,
- fabricate teacher approval,
- alter grades without authorization.

## Curriculum Integrity

AI-generated content can create:

- examples,
- practice variations,
- explanations,
- quiz drafts,
- lesson plan drafts.

AI-generated content must not become canonical curriculum until reviewed by authorized humans.

Canonical content must preserve:

- learning objective,
- skill mapping,
- level,
- assessment criteria,
- safety requirements.

## RAG Safety

RAG pipelines must:

- restrict retrieval by tenant and permissions,
- prevent cross-institution leakage,
- detect prompt injection in uploaded content,
- cite or reference source material where appropriate,
- avoid answering from untrusted documents without constraints,
- log retrieved chunk IDs.

## Privacy Requirements

AI requests must minimize:

- personal data,
- child data,
- unrelated learner history,
- private institution data.

AI logs must define:

- retention period,
- access controls,
- redaction rules,
- export/deletion rules,
- audit requirements.

## Human Oversight

Human review is required for:

- grade-changing decisions,
- disciplinary flags,
- child safety escalation,
- canonical curriculum publishing,
- institution-level reports with high-stakes consequences,
- AI-generated certificates or readiness claims.

## AI Evaluation

Evaluate AI features for:

- factual correctness,
- code correctness,
- pedagogical usefulness,
- safety,
- groundedness,
- bias,
- age appropriateness,
- hallucination,
- refusal quality,
- cost,
- latency.

Test sets should include:

- beginner coding questions,
- Blockly mistakes,
- Python/JavaScript/PHP/Laravel/React examples,
- prompt injection attempts,
- Kenyan curriculum questions,
- child safety prompts,
- grading edge cases,
- code review tasks.

## Cost Governance

Controls:

- tenant quotas,
- learner quotas,
- feature-level limits,
- model routing by cost,
- caching,
- prompt compression,
- usage dashboards,
- alerts for abnormal spend,
- per-plan AI entitlements.

## AI Incident Types

Track incidents such as:

- unsafe response,
- privacy leak,
- hallucinated curriculum,
- wrong grading feedback,
- full solution leakage during assessment,
- provider outage,
- cost spike,
- prompt injection success.

Each incident should have:

- severity,
- affected users,
- prompt/model version,
- logs,
- remediation,
- prevention action.

## Institution AI Controls

Institutions should eventually configure:

- enabled AI features,
- learner AI limits,
- teacher moderation level,
- allowed providers,
- data usage policy,
- AI transcript visibility,
- assessment assistance rules.

## Definition Of Done

An AI feature is production-ready when:

- prompt is versioned,
- input/output schema is defined,
- safety rules exist,
- evaluation tests pass,
- cost tracking exists,
- logs are privacy-reviewed,
- fallback behavior exists,
- user-facing limitations are clear,
- human review exists where needed.
