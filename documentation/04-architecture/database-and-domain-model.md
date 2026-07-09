# Database And Domain Model

## Purpose

This document defines the initial database and domain model strategy for the AI Learning Platform.

The database must support:

- multi-tenant institutions,
- learners,
- teachers,
- parents,
- curriculum knowledge graph,
- lessons,
- assessments,
- block coding projects,
- coding IDE projects,
- learner digital twins,
- AI activity,
- subscriptions,
- payments,
- analytics,
- offline sync,
- audit logs.

## Database Decision

Use PostgreSQL as the primary database.

Reasons:

- strong relational integrity,
- JSONB support,
- advanced indexing,
- full-text search,
- pgvector support,
- analytics-friendly SQL,
- strong fit for complex SaaS domains.

## Modeling Principles

- Model core business data relationally.
- Use JSONB for flexible metadata, not as a shortcut for unclear modeling.
- Every table with institution-owned data must be tenant-scoped directly or indirectly.
- Every important workflow must create audit/event records.
- Every table expected to sync offline must have stable IDs and version metadata.
- Every AI-generated object must track source, prompt/model version, and review status.
- Every mastery claim must link to evidence.

## ID Strategy

Recommended:

- Use UUID or ULID for externally visible IDs.
- Use database IDs only internally where appropriate.
- Offline-capable objects must use client-safe stable IDs.

Required metadata for syncable tables:

- `id`,
- `created_at`,
- `updated_at`,
- `deleted_at` where needed,
- `version`,
- `created_by`,
- `updated_by`,
- `institution_id` where tenant-scoped.

## Domain Table Groups

### Identity

Tables:

- `users`,
- `user_profiles`,
- `sessions`,
- `personal_access_tokens`,
- `social_accounts`,
- `mfa_factors`,
- `password_reset_tokens`.

Purpose:

- authentication,
- global user identity,
- profile basics,
- login security.

### Access Control

Tables:

- `roles`,
- `permissions`,
- `model_has_roles`,
- `model_has_permissions`,
- `role_has_permissions`,
- `feature_flags`,
- `entitlements`.

Purpose:

- role/permission-based access,
- institution-scoped authorization,
- subscription access checks.

### Institutions

Tables:

- `institutions`,
- `campuses`,
- `departments`,
- `institution_memberships`,
- `classes`,
- `cohorts`,
- `class_memberships`,
- `invitations`,
- `guardian_links`.

Purpose:

- schools,
- bootcamps,
- universities,
- NGOs,
- teachers,
- learners,
- parents.

### Curriculum Knowledge Graph

Tables:

- `domains`,
- `concepts`,
- `skills`,
- `competencies`,
- `skill_relationships`,
- `curriculum_standards`,
- `standard_skill_mappings`,
- `career_paths`,
- `career_skill_mappings`.

Purpose:

- structured computing knowledge,
- prerequisites,
- standards alignment,
- career alignment.

### Learning Content

Tables:

- `courses`,
- `modules`,
- `lessons`,
- `lesson_versions`,
- `lesson_blocks`,
- `learning_resources`,
- `resource_skill_mappings`,
- `localized_content_variants`,
- `teacher_guides`.

Purpose:

- canonical curriculum,
- content versioning,
- resources,
- local examples,
- teacher support.

### Learning Progress

Tables:

- `enrollments`,
- `lesson_progress`,
- `activity_attempts`,
- `learning_events`,
- `mastery_events`,
- `review_schedules`.

Purpose:

- progress,
- learning events,
- review timing,
- mastery updates.

### Learner Digital Twin

Tables:

- `learner_profiles`,
- `learner_skill_states`,
- `learner_skill_evidence`,
- `learner_misconceptions`,
- `learner_learning_preferences`,
- `learner_project_profiles`,
- `learner_portfolio_items`,
- `learner_career_signals`,
- `learner_recommendations`,
- `learner_ai_memory_summaries`,
- `learner_intervention_flags`.

Purpose:

- adaptive learning,
- AI personalization,
- teacher intervention,
- career guidance.

### Assessments

Tables:

- `assessments`,
- `assessment_items`,
- `assessment_skill_mappings`,
- `assessment_attempts`,
- `assessment_responses`,
- `rubrics`,
- `rubric_criteria`,
- `rubric_scores`,
- `grading_feedback`.

Purpose:

- quizzes,
- coding challenges,
- debugging challenges,
- rubrics,
- feedback.

### Block Coding

Tables:

- `block_projects`,
- `block_project_versions`,
- `block_project_assets`,
- `block_project_submissions`,
- `block_project_feedback`,
- `block_definitions`,
- `block_categories`.

Purpose:

- Blockly projects,
- generated code,
- assets,
- submissions,
- feedback.

### IDE And Code Projects

Tables:

- `code_projects`,
- `code_project_files`,
- `code_project_versions`,
- `code_submissions`,
- `code_reviews`,
- `test_suites`,
- `test_cases`,
- `test_results`.

Purpose:

- text coding,
- submissions,
- testing,
- project history.

### Code Execution

Tables:

- `execution_requests`,
- `execution_results`,
- `execution_logs`,
- `execution_artifacts`,
- `sandbox_policies`.

Purpose:

- sandbox orchestration,
- result tracking,
- abuse monitoring.

### AI

Tables:

- `ai_requests`,
- `ai_responses`,
- `ai_prompt_versions`,
- `ai_provider_models`,
- `ai_safety_results`,
- `ai_usage_records`,
- `ai_evaluation_results`,
- `rag_documents`,
- `rag_chunks`,
- `rag_embeddings`.

Purpose:

- AI Gateway,
- prompt governance,
- model routing,
- cost tracking,
- RAG.

### Media

Tables:

- `media_assets`,
- `media_collections`,
- `upload_sessions`,
- `file_processing_jobs`.

Purpose:

- videos,
- PDFs,
- images,
- audio,
- certificates,
- project assets.

### Subscriptions And Payments

Tables:

- `plans`,
- `plan_features`,
- `subscriptions`,
- `subscription_items`,
- `seat_allocations`,
- `invoices`,
- `payments`,
- `payment_methods`,
- `payment_webhooks`,
- `usage_meters`,
- `discounts`.

Purpose:

- individual billing,
- institution seats,
- M-Pesa,
- Stripe,
- AI quotas.

### Gamification

Tables:

- `xp_events`,
- `badges`,
- `learner_badges`,
- `streaks`,
- `quests`,
- `quest_progress`,
- `leaderboards`.

Purpose:

- motivation,
- achievements,
- progress loops.

### Notifications

Tables:

- `notifications`,
- `notification_preferences`,
- `notification_deliveries`,
- `message_templates`.

Purpose:

- in-app,
- email,
- future SMS/WhatsApp.

### Offline Sync

Tables:

- `devices`,
- `sync_sessions`,
- `sync_cursors`,
- `sync_operations`,
- `sync_conflicts`,
- `offline_packages`.

Purpose:

- mobile/desktop offline support,
- sync metadata,
- conflict tracking.

### Audit And Operations

Tables:

- `audit_logs`,
- `security_events`,
- `admin_actions`,
- `data_exports`,
- `system_events`,
- `webhook_events`.

Purpose:

- security,
- compliance,
- support,
- incident response.

## Tenant Isolation Rules

- Institution-owned records must be queryable by `institution_id`.
- User membership must be checked before accessing institution-scoped records.
- Background jobs must include tenant context.
- Cache keys must include tenant context.
- Audit logs must record tenant context.
- Data exports must be tenant-scoped.

## Index Strategy

Required indexes:

- tenant IDs,
- user IDs,
- class/cohort IDs,
- status fields,
- timestamps,
- foreign keys,
- slug/identifier fields,
- subscription state,
- learner skill lookup,
- assessment attempts,
- AI usage by tenant/time,
- learning events by learner/time,
- queue/outbox state where used.

Use GIN indexes where appropriate for JSONB and full-text search.

## Vector Strategy

Use pgvector first for:

- lesson chunks,
- teacher guides,
- coding examples,
- assessment rubrics,
- help documents,
- curriculum standards,
- AI tutor retrieval.

Store embedding metadata:

- source type,
- source ID,
- tenant/institution scope,
- curriculum version,
- language,
- skill IDs,
- chunk hash,
- embedding model,
- created date.

## Analytics Strategy

Start with operational read models in PostgreSQL.

Future:

- analytics warehouse,
- event stream,
- BI dashboards,
- longitudinal learner analytics.

Learning events should be designed with xAPI/Caliper compatibility in mind.

## Migration Strategy

- migrations should be module-owned,
- each migration should be reversible where practical,
- high-risk migrations should have backfill plans,
- data changes should be separated from schema changes where needed,
- production migrations must be tested on realistic data volume.

## Data Retention

Retention policies must be defined for:

- AI raw logs,
- learner activity,
- child data,
- payment records,
- audit logs,
- code execution logs,
- uploads,
- deleted accounts.

## Immediate Next Work

Next database documents:

- Entity Relationship Diagram.
- Tenant Isolation Specification.
- Learner Digital Twin Schema.
- Knowledge Graph Schema.
- Subscription Billing Schema.
- Offline Sync Schema.
- AI/RAG Schema.
