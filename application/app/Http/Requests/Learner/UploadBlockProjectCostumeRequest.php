<?php

namespace App\Http\Requests\Learner;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UploadBlockProjectCostumeRequest extends FormRequest
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
        $maxKilobytes = (int) config('learning.block_costume.max_kilobytes', 1024);
        $allowedMimes = (array) config('learning.block_costume.allowed_mimes', ['jpg', 'jpeg', 'png', 'gif', 'webp']);

        return [
            'file' => [
                'required',
                File::types($allowedMimes)->max($maxKilobytes),
            ],
            'name' => ['nullable', 'string', 'max:120'],
        ];
    }
}
