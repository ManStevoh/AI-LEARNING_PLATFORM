<?php

namespace App\Http\Requests\Institution;

use Illuminate\Foundation\Http\FormRequest;

class SaveAiPromptVersionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'version' => ['required', 'string', 'regex:/^v\d+$/', 'max:20'],
            'system_template' => ['required', 'string', 'max:50000'],
            'user_template' => ['required', 'string', 'max:50000'],
            'safety_rules' => ['nullable', 'array'],
            'safety_rules.*' => ['string', 'max:100'],
            'changelog' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
