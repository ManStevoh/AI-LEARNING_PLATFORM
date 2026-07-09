# Privacy And Data Protection

## Purpose

This document defines privacy and data protection requirements for the AI Learning Platform.

The platform will process learner data, child data, institution data, AI logs, assessment records, payments, and analytics.

## Privacy Principles

- collect only what is needed,
- explain why data is collected,
- protect child data,
- limit access by role,
- keep data tenant-scoped,
- define retention periods,
- allow export/deletion where required,
- log sensitive access,
- review AI data use carefully.

## Data Categories

### Identity Data

- name,
- email,
- phone where needed,
- role,
- institution membership.

### Learner Data

- progress,
- skill states,
- assessment results,
- projects,
- feedback,
- learner digital twin records.

### Child Data

- age band,
- guardian relationship,
- learning records,
- safety settings.

### Institution Data

- school profile,
- classes,
- rosters,
- reports,
- billing contacts.

### AI Data

- prompts,
- responses,
- context metadata,
- usage records,
- safety results,
- memory summaries.

### Payment Data

- invoices,
- payment status,
- provider references,
- subscription records.

Do not store raw card data.

## Legal/Compliance References

Consider:

- Kenya Data Protection Act and ODPC guidance,
- GDPR principles,
- COPPA where serving under-13 children in relevant jurisdictions,
- FERPA where working with covered U.S. institutions,
- institutional data processing agreements.

## Data Subject Rights

Support workflows for:

- access,
- correction,
- deletion,
- export,
- objection/restriction where applicable.

## Consent And Child Safety

Requirements:

- define age policy,
- guardian consent where required,
- school/institution consent model where applicable,
- child-friendly explanations,
- guardian controls,
- restricted communication features.

## AI Data Rules

- minimize personal data sent to providers,
- avoid unnecessary raw conversation retention,
- redact sensitive data where possible,
- respect institution AI settings,
- do not train external models on private data unless explicitly allowed by contract,
- store durable memory as summaries where possible.

## Retention Policy Draft

Define retention for:

- learner accounts,
- deleted learners,
- AI raw logs,
- AI memory summaries,
- code execution logs,
- payment records,
- audit logs,
- exports,
- inactive institutions.

Initial recommendation:

- keep audit/payment records according to legal/business requirements,
- retain AI raw logs for limited period,
- retain learner progress while account/institution contract is active,
- support deletion/anonymization when required.

## Data Processing Agreements

Institution agreements should define:

- controller/processor roles,
- data categories,
- purpose,
- subprocessors,
- retention,
- deletion,
- breach notice,
- security controls,
- cross-border transfer terms.

## Access Control

Sensitive data access must be limited:

- learner sees own data,
- parent sees linked child data,
- teacher sees assigned class learners,
- institution admin sees institution reports,
- platform admin access is logged and limited.

## Privacy Review Checklist

For every new feature:

- What data is collected?
- Why is it needed?
- Who can access it?
- Is it child data?
- Is it sent to AI provider?
- How long is it retained?
- Can it be exported/deleted?
- Is consent required?
- Is it logged?

## Definition Of Done

A feature is privacy-ready when:

- data categories are documented,
- access rules are defined,
- retention is known,
- AI data use is reviewed,
- tenant scoping exists,
- user/institution notices are updated where needed.
