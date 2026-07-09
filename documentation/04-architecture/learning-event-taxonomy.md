# Learning Event Taxonomy

## Purpose

This document defines learning events for progress tracking, analytics, learner digital twin updates, teacher dashboards, institution reports, and future compatibility with xAPI/Caliper-style learning analytics.

## Event Principles

- Events should describe facts that happened.
- Events should be append-only where possible.
- Events should include actor, object, context, timestamp, and tenant.
- Events should be privacy-aware.
- Events should map to skills where possible.

## Event Structure

Recommended base fields:

- `event_id`,
- `event_type`,
- `actor_user_id`,
- `learner_profile_id`,
- `institution_id`,
- `class_id`,
- `object_type`,
- `object_id`,
- `skill_ids`,
- `occurred_at`,
- `recorded_at`,
- `source`,
- `metadata`.

## Event Categories

### Lesson Events

- `lesson_started`
- `lesson_section_viewed`
- `lesson_completed`
- `lesson_revisited`
- `lesson_abandoned`

### Practice Events

- `practice_started`
- `practice_completed`
- `hint_requested`
- `answer_submitted`
- `answer_correct`
- `answer_incorrect`
- `review_due`
- `review_completed`

### Assessment Events

- `assessment_started`
- `assessment_submitted`
- `assessment_passed`
- `assessment_failed`
- `rubric_scored`
- `teacher_feedback_added`
- `ai_feedback_generated`

### Block Coding Events

- `block_project_created`
- `block_project_saved`
- `block_project_run`
- `block_project_submitted`
- `block_project_reviewed`
- `block_error_detected`

### IDE And Code Events

- `code_project_created`
- `code_file_updated`
- `code_execution_requested`
- `code_execution_completed`
- `test_passed`
- `test_failed`
- `code_submission_created`
- `code_review_added`

### AI Events

- `ai_mentor_opened`
- `ai_question_asked`
- `ai_hint_given`
- `ai_code_review_requested`
- `ai_response_rated`
- `ai_safety_blocked`
- `ai_usage_recorded`

### Portfolio Events

- `portfolio_item_created`
- `portfolio_item_approved`
- `certificate_awarded`
- `badge_awarded`
- `project_published`

### Teacher Events

- `assignment_created`
- `assignment_published`
- `class_report_viewed`
- `learner_intervention_added`
- `lesson_plan_generated`

### Institution Events

- `learner_invited`
- `teacher_invited`
- `seat_assigned`
- `report_export_requested`
- `subscription_updated`

### Offline Sync Events

- `offline_package_downloaded`
- `offline_progress_recorded`
- `sync_started`
- `sync_completed`
- `sync_conflict_detected`
- `sync_conflict_resolved`

## Skill Mastery Event Rules

Skill mastery should not update from completion alone.

Evidence should include:

- assessment result,
- project rubric,
- debugging success,
- repeated practice,
- teacher feedback,
- AI-reviewed evidence where allowed.

Mastery events:

- `skill_introduced`
- `skill_practiced`
- `skill_evidence_added`
- `skill_mastery_increased`
- `skill_mastered`
- `skill_review_needed`
- `skill_regressed`

## Privacy Rules

- Do not store unnecessary raw content in event metadata.
- Avoid storing full AI conversation text in analytics events.
- Store references to secure records instead.
- Respect retention policies.
- Ensure tenant scoping.

## Dashboard Use

Events should power:

- learner dashboard,
- teacher dashboard,
- institution dashboard,
- skill mastery reports,
- AI usage reports,
- cohort progress,
- pilot success metrics.

## Future Standards Mapping

The internal event model should later be mapped to:

- xAPI statements,
- Caliper Analytics metric profiles,
- institution reporting exports.

## Definition Of Done

An event is ready when:

- type name is clear,
- producer is defined,
- consumer is defined,
- schema is defined,
- privacy review is complete,
- analytics purpose is known,
- retention policy is defined.
