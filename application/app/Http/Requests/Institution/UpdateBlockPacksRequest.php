<?php

namespace App\Http\Requests\Institution;

use App\Models\Institution;
use App\Modules\BlockCoding\Services\InstitutionBlockPackService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBlockPacksRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var Institution|null $institution */
        $institution = $this->route('institution');

        return $institution !== null && $this->user()?->can('update', $institution) === true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'enabled_packs' => ['present', 'array', 'distinct'],
            'enabled_packs.*' => ['required', 'string', Rule::in(InstitutionBlockPackService::catalogPackIds())],
        ];
    }
}
