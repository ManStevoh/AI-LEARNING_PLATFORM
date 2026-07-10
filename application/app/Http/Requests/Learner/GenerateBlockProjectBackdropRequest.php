<?php

namespace App\Http\Requests\Learner;

use App\Modules\BlockCoding\Support\AiBackdropThemeCatalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GenerateBlockProjectBackdropRequest extends FormRequest
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
            'theme' => ['required', 'string', Rule::in(array_keys(AiBackdropThemeCatalog::themes()))],
        ];
    }
}
