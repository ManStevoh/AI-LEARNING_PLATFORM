<?php

namespace App\Modules\AI\Services;

use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Data\AiResponse;
use App\Modules\AI\Models\AiUsageRecord;

class AiUsageLogger
{
    public function log(AiRequest $request, AiResponse $response, string $status = 'success'): AiUsageRecord
    {
        return AiUsageRecord::query()->create([
            'institution_id' => $request->tenantId,
            'user_id' => $request->userId,
            'request_id' => $response->requestId,
            'provider' => $response->provider,
            'model' => $response->model,
            'task_type' => $request->taskType,
            'prompt_tokens' => $response->usage['prompt_tokens'] ?? 0,
            'completion_tokens' => $response->usage['completion_tokens'] ?? 0,
            'latency_ms' => $response->latencyMs,
            'status' => $status,
            'metadata' => [
                'prompt_id' => $request->promptId,
                'request_metadata' => $request->metadata,
                'response_metadata' => $response->metadata,
            ],
        ]);
    }
}
