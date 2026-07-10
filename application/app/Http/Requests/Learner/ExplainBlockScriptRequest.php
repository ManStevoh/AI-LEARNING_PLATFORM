<?php

namespace App\Http\Requests\Learner;

use Illuminate\Foundation\Http\FormRequest;

class ExplainBlockScriptRequest extends FormRequest
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
            'script' => ['required', 'string', 'max:4000'],
            'context' => ['nullable', 'string', 'max:500'],
        ];
    }
}
