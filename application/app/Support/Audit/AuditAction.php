<?php

namespace App\Support\Audit;

final class AuditAction
{
    public const AUTH_LOGIN = 'auth.login';

    public const AUTH_LOGOUT = 'auth.logout';

    public const TENANT_INSTITUTION_SWITCHED = 'tenant.institution_switched';

    public const BLOCK_PROJECT_FEEDBACK_SAVED = 'block_project.feedback_saved';

    public const AI_PROMPT_DRAFT_SAVED = 'ai_prompt.draft_saved';

    public const AI_PROMPT_VERSION_PUBLISHED = 'ai_prompt.version_published';
}
