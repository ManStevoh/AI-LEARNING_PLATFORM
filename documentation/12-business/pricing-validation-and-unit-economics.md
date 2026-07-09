# Pricing Validation And Unit Economics

## Purpose

This document defines how the platform should validate pricing and measure whether subscriptions can sustainably support AI, infrastructure, support, content, and growth costs.

## Pricing Must Be Validated

Initial prices are hypotheses, not facts.

Pricing must be validated through:

- institution interviews,
- pilot conversions,
- parent feedback,
- competitor benchmarking,
- cost modeling,
- willingness-to-pay tests.

## Revenue Segments

### Individual Learners

Potential plans:

- Free,
- Student Pro,
- Career Track,
- Family.

### Institutions

Potential plans:

- Institution Starter,
- Institution Growth,
- Institution Enterprise,
- NGO/Government Cohort.

### Future Revenue

- marketplace revenue share,
- certification fees,
- employer partnerships,
- API/platform licensing,
- custom enterprise deployments.

## Cost Drivers

Primary costs:

- AI tokens,
- embeddings,
- code execution sandbox,
- storage,
- bandwidth,
- database,
- Redis/queues,
- observability,
- support,
- content production,
- sales/customer success,
- payment fees.

## Unit Economics Metrics

Track:

- revenue per learner,
- revenue per institution,
- AI cost per active learner,
- sandbox cost per active learner,
- support cost per institution,
- gross margin,
- activation rate,
- retention rate,
- conversion rate,
- churn,
- customer acquisition cost,
- lifetime value.

## AI Cost Model

Track AI cost by:

- feature,
- agent,
- model,
- tenant,
- learner,
- teacher,
- prompt version.

Examples:

- AI mentor question cost,
- AI code review cost,
- AI quiz generation cost,
- AI curriculum draft cost,
- AI report summary cost.

Plan limits should use:

- monthly AI credits,
- per-feature caps,
- fair use limits,
- institution-level controls.

## Sandbox Cost Model

Track:

- execution count,
- average runtime,
- memory/CPU profile,
- timeout rate,
- language/runtime,
- tenant.

Institution plans may include:

- monthly execution minutes,
- per-learner execution quotas,
- overage controls.

## Pricing Experiments

### Institution Pilot Pricing

Test:

- free pilot,
- discounted paid pilot,
- paid pilot credited toward annual plan.

Measure:

- seriousness of adoption,
- conversion after pilot,
- support burden,
- decision cycle length.

### Per-Learner Pricing

Test:

- per learner per month,
- per learner per term,
- annual seat bundles.

Measure:

- budget fit,
- procurement simplicity,
- utilization.

### Tiered Plans

Test packaging:

- basic learning only,
- learning + AI,
- learning + AI + code execution,
- full institution analytics.

Measure:

- which features drive willingness to pay.

## Payment Methods

Kenya-first:

- M-Pesa STK Push,
- manual invoice/bank transfer for institutions,
- cards later through Stripe or local processor.

Requirements:

- asynchronous payment callbacks,
- reconciliation,
- receipt/invoice generation,
- failed payment handling,
- entitlement updates,
- audit logging.

## Minimum Financial Dashboard

Show:

- monthly recurring revenue,
- active institutions,
- active learners,
- AI cost,
- sandbox cost,
- gross margin,
- churn,
- overdue invoices,
- trial-to-paid conversion.

## Validation Questions

- What price will schools approve without long procurement?
- Do schools prefer per-learner or package pricing?
- What AI features justify paid plans?
- How much AI usage is sustainable?
- Are parents willing to pay directly?
- Does a paid pilot convert better than a free pilot?

## Acceptance Criteria

- every plan has entitlements,
- every entitlement has measurable usage,
- AI and sandbox costs are tracked,
- pilots collect willingness-to-pay data,
- pricing decisions are updated from evidence,
- finance actions are auditable.
