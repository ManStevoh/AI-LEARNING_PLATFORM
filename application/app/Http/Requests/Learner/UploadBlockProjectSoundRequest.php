<?php

namespace App\Http\Requests\Learner;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UploadBlockProjectSoundRequest extends FormRequest
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
        $maxKilobytes = (int) config('learning.block_sound.max_kilobytes', 2048);
        $allowedMimes = (array) config('learning.block_sound.allowed_mimes', ['audio/mpeg', 'audio/wav', 'audio/ogg']);

        return [
            'file' => [
                'required',
                File::types($allowedMimes)->max($maxKilobytes),
            ],
            'name' => ['nullable', 'string', 'max:120'],
        ];
    }
}
