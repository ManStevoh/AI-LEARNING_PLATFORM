<?php

namespace App\Http\Requests\Learner;

use Illuminate\Foundation\Http\FormRequest;

class MarkLessonCheckpointRequest extends FormRequest
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
            'step_key' => ['required', 'string', 'max:64', 'regex:/^[a-zA-Z0-9_-]+$/'],
        ];
    }
}
