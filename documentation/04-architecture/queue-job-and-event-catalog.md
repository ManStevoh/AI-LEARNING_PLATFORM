# Queue, Job, And Event Catalog

## Purpose

This document defines the main asynchronous jobs and domain events for the platform.

Expensive, slow, risky, or retryable work should not run inside normal web requests.

## Queue Principles

- Queue AI generation.
- Queue code execution.
- Queue reports.
- Queue notifications.
- Queue imports/exports.
- Queue media processing.
- Make jobs idempotent where possible.
- Track failures and retries.

## Recommended Queues

- default,
- ai,
- code-execution,
- notifications,
- reports,
- imports,
- media,
- billing,
- low-priority.

## Core Domain Events

Identity:

- UserRegistered,
- UserVerified,
- UserSuspended,
- RoleChanged.

Institutions:

- InstitutionCreated,
- TeacherInvited,
- LearnersImported,
- ClassCreated,
- LearnerEnrolled.

Learning:

- LessonStarted,
- LessonCompleted,
- PracticeSubmitted,
- ProjectSubmitted,
- ReviewDue.

Assessment:

- AssessmentStarted,
- AssessmentSubmitted,
- RubricScored,
- GradeOverridden.

Block Coding:

- BlockProjectCreated,
- BlockProjectRun,
- BlockProjectSubmitted,
- BlockErrorDetected.

IDE:

- CodeProjectCreated,
- CodeExecutionRequested,
- CodeExecutionCompleted,
- CodeSubmissionCreated.

AI:

- AiQuestionAsked,
- AiResponseGenerated,
- AiToolCalled,
- AiSafetyBlocked,
- AiUsageRecorded,
- AiResponseRated.

Billing:

- SubscriptionCreated,
- SubscriptionChanged,
- PaymentInitiated,
- PaymentConfirmed,
- PaymentFailed,
- InvoiceIssued.

## Job Catalog

### AI Jobs

- GenerateAiResponse,
- GenerateQuizDraft,
- GenerateLessonDraft,
- ReviewCodeSubmission,
- SummarizeClassProgress,
- UpdateLearnerMemory,
- RunAiEvaluation.

### Code Execution Jobs

- ExecuteCode,
- RunVisibleTests,
- RunHiddenTests,
- StoreExecutionResult,
- AnalyzeExecutionError.

### Curriculum Jobs

- IngestContentForRag,
- GenerateEmbeddings,
- ValidateContentLinks,
- PublishContentVersion.

### Institution Jobs

- ImportLearners,
- ExportInstitutionReport,
- GenerateClassProgressReport.

### Billing Jobs

- ReconcilePayment,
- ProcessMpesaCallback,
- GenerateInvoice,
- CheckSubscriptionLimits.

### Notification Jobs

- SendEmailNotification,
- SendInAppNotification,
- SendWhatsAppTemplateLater,
- GenerateDigest.

## Job Metadata

Every important job should track:

- job ID,
- tenant ID,
- user/actor ID,
- correlation ID,
- queue,
- attempts,
- status,
- started/completed timestamps,
- error,
- related resource.

## Idempotency

Required for:

- payment callbacks,
- learner imports,
- certificate issuance,
- AI workflow steps,
- notifications,
- report generation.

## Failure Handling

Failures should have:

- retry policy,
- dead-letter or failed job review,
- admin visibility,
- user-safe message where relevant,
- alert threshold.

## Acceptance Criteria

- slow work runs in queues,
- jobs include tenant context,
- payment jobs are idempotent,
- AI jobs log usage,
- code execution jobs enforce sandbox limits,
- failed jobs are observable.
