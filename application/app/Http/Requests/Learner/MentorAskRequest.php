<?php

namespace App\Http\Requests\Learner;

use Illuminate\Foundation\Http\FormRequest;

class MentorAskRequest extends FormRequest
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
            'message' => ['required', 'string', 'max:2000'],
            'lesson_slug' => ['nullable', 'string', 'max:255'],
        ];
    }
}
