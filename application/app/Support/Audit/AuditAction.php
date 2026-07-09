<?php

namespace App\Support\Audit;

final class AuditAction
{
    public const AUTH_LOGIN = 'auth.login';

    public const AUTH_LOGOUT = 'auth.logout';

    public const TENANT_INSTITUTION_SWITCHED = 'tenant.institution_switched';
}
