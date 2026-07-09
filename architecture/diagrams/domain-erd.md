# Domain ERD

## Purpose

This document provides first-pass entity relationship diagrams for the core platform domains. These diagrams are conceptual and should guide detailed database migrations later.

## Institution And Identity

```mermaid
erDiagram
    USERS ||--o{ INSTITUTION_MEMBERSHIPS : has
    INSTITUTIONS ||--o{ INSTITUTION_MEMBERSHIPS : contains
    INSTITUTIONS ||--o{ CAMPUSES : has
    INSTITUTIONS ||--o{ CLASSES : has
    CLASSES ||--o{ CLASS_MEMBERSHIPS : contains
    USERS ||--o{ CLASS_MEMBERSHIPS : joins
    USERS ||--o{ GUARDIAN_LINKS : guardian_or_child

    USERS {
        uuid id
        string name
        string email
        timestamp created_at
    }

    INSTITUTIONS {
        uuid id
        string name
        string country
        string subscription_status
    }

    INSTITUTION_MEMBERSHIPS {
        uuid id
        uuid user_id
        uuid institution_id
        string role
        string status
    }

    CLASSES {
        uuid id
        uuid institution_id
        string name
        string academic_period
    }
```

## Curriculum Knowledge Graph

```mermaid
erDiagram
    DOMAINS ||--o{ CONCEPTS : contains
    CONCEPTS ||--o{ SKILLS : contains
    SKILLS ||--o{ SKILL_RELATIONSHIPS : source
    SKILLS ||--o{ SKILL_RELATIONSHIPS : target
    SKILLS ||--o{ RESOURCE_SKILL_MAPPINGS : maps
    LEARNING_RESOURCES ||--o{ RESOURCE_SKILL_MAPPINGS : supports
    SKILLS ||--o{ ASSESSMENT_SKILL_MAPPINGS : assessed_by
    ASSESSMENTS ||--o{ ASSESSMENT_SKILL_MAPPINGS : assesses
    CAREER_PATHS ||--o{ CAREER_SKILL_MAPPINGS : requires
    SKILLS ||--o{ CAREER_SKILL_MAPPINGS : required_skill

    DOMAINS {
        uuid id
        string name
        string slug
    }

    CONCEPTS {
        uuid id
        uuid domain_id
        string name
        string slug
    }

    SKILLS {
        uuid id
        uuid concept_id
        string name
        string level
        string difficulty
    }

    SKILL_RELATIONSHIPS {
        uuid id
        uuid source_skill_id
        uuid target_skill_id
        string relationship_type
    }
```

## Learning Progress And Digital Twin

```mermaid
erDiagram
    USERS ||--o{ LEARNER_PROFILES : has
    LEARNER_PROFILES ||--o{ ENROLLMENTS : has
    COURSES ||--o{ ENROLLMENTS : contains
    LEARNER_PROFILES ||--o{ LESSON_PROGRESS : tracks
    LESSONS ||--o{ LESSON_PROGRESS : completed_by
    LEARNER_PROFILES ||--o{ LEARNER_SKILL_STATES : has
    SKILLS ||--o{ LEARNER_SKILL_STATES : tracked_for
    LEARNER_SKILL_STATES ||--o{ LEARNER_SKILL_EVIDENCE : supported_by
    LEARNER_PROFILES ||--o{ LEARNER_RECOMMENDATIONS : receives

    LEARNER_PROFILES {
        uuid id
        uuid user_id
        uuid institution_id
        string level
        string goal
    }

    LEARNER_SKILL_STATES {
        uuid id
        uuid learner_profile_id
        uuid skill_id
        string state
        decimal mastery_score
        timestamp review_due_at
    }

    LEARNER_SKILL_EVIDENCE {
        uuid id
        uuid learner_skill_state_id
        string evidence_type
        uuid evidence_id
        decimal score
    }
```

## Projects, Assessments, And Execution

```mermaid
erDiagram
    LEARNER_PROFILES ||--o{ BLOCK_PROJECTS : creates
    BLOCK_PROJECTS ||--o{ BLOCK_PROJECT_VERSIONS : versioned_as
    BLOCK_PROJECTS ||--o{ BLOCK_PROJECT_SUBMISSIONS : submitted_as
    LEARNER_PROFILES ||--o{ CODE_PROJECTS : creates
    CODE_PROJECTS ||--o{ CODE_PROJECT_FILES : contains
    CODE_PROJECTS ||--o{ CODE_SUBMISSIONS : submitted_as
    CODE_SUBMISSIONS ||--o{ EXECUTION_REQUESTS : runs
    EXECUTION_REQUESTS ||--o{ EXECUTION_RESULTS : produces
    ASSESSMENTS ||--o{ ASSESSMENT_ATTEMPTS : attempted_as
    LEARNER_PROFILES ||--o{ ASSESSMENT_ATTEMPTS : attempts

    BLOCK_PROJECTS {
        uuid id
        uuid learner_profile_id
        uuid institution_id
        string title
        json workspace_json
    }

    CODE_PROJECTS {
        uuid id
        uuid learner_profile_id
        uuid institution_id
        string title
        string language
    }

    EXECUTION_REQUESTS {
        uuid id
        uuid code_submission_id
        string status
        string sandbox_policy
    }
```

## Subscriptions And Usage

```mermaid
erDiagram
    INSTITUTIONS ||--o{ SUBSCRIPTIONS : owns
    PLANS ||--o{ SUBSCRIPTIONS : selected
    SUBSCRIPTIONS ||--o{ SEAT_ALLOCATIONS : grants
    SUBSCRIPTIONS ||--o{ USAGE_METERS : meters
    SUBSCRIPTIONS ||--o{ INVOICES : billed_by
    INVOICES ||--o{ PAYMENTS : paid_by

    PLANS {
        uuid id
        string name
        string billing_interval
    }

    SUBSCRIPTIONS {
        uuid id
        uuid institution_id
        uuid plan_id
        string status
        timestamp renews_at
    }

    USAGE_METERS {
        uuid id
        uuid subscription_id
        string metric
        integer used
        integer limit
    }
```

## AI And RAG

```mermaid
erDiagram
    USERS ||--o{ AI_REQUESTS : creates
    AI_REQUESTS ||--o{ AI_RESPONSES : produces
    AI_REQUESTS ||--o{ AI_SAFETY_RESULTS : checked_by
    AI_PROMPT_VERSIONS ||--o{ AI_REQUESTS : used_by
    RAG_DOCUMENTS ||--o{ RAG_CHUNKS : split_into
    RAG_CHUNKS ||--o{ RAG_EMBEDDINGS : embedded_as
    AI_REQUESTS ||--o{ AI_USAGE_RECORDS : metered_by

    AI_REQUESTS {
        uuid id
        uuid user_id
        uuid institution_id
        string feature
        string provider
        string model
    }

    RAG_CHUNKS {
        uuid id
        uuid rag_document_id
        text content
        json metadata
    }
```

## Next ERD Work

The next version should include:

- exact columns,
- indexes,
- foreign keys,
- delete behavior,
- tenant scoping,
- sync metadata,
- audit fields,
- migration order.
