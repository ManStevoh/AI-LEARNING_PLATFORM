<?php

namespace App\Support\Tenancy;

use App\Models\Institution;

class TenantContext
{
    public function __construct(
        private ?Institution $institution = null,
    ) {}

    public function set(Institution $institution): void
    {
        $this->institution = $institution;
    }

    public function current(): ?Institution
    {
        return $this->institution;
    }

    public function id(): ?int
    {
        return $this->institution?->id;
    }

    public function hasCurrent(): bool
    {
        return $this->institution !== null;
    }

    public function clear(): void
    {
        $this->institution = null;
    }
}
