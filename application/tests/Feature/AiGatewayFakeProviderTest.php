<?php

namespace Tests\Feature;

use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Gateway\AiGateway;
use App\Modules\AI\Models\AiUsageRecord;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AiGatewayFakeProviderTest extends TestCase
{
    use RefreshDatabase;

    public function test_gateway_completes_request_with_fake_provider_and_logs_usage(): void
    {
        config([
            'ai.default_provider' => 'fake',
            'ai.providers.fake.enabled' => true,
        ]);

        $gateway = app(AiGateway::class);

        $response = $gateway->complete(new AiRequest(
            taskType: 'learner_mentor_hint',
            messages: [
                ['role' => 'user', 'content' => 'How do I make my sprite move?'],
            ],
            tenantId: null,
            userId: null,
            metadata: ['lesson_slug' => 'unit-03-motion-and-coordinates'],
        ));

        $this->assertSame('fake', $response->provider);
        $this->assertNotSame('', $response->content);
        $this->assertGreaterThan(0, $response->latencyMs);

        $this->assertDatabaseHas('ai_usage_records', [
            'request_id' => $response->requestId,
            'provider' => 'fake',
            'task_type' => 'learner_mentor_hint',
            'status' => 'success',
        ]);
    }

    public function test_gateway_rejects_requests_when_fake_provider_is_disabled(): void
    {
        config([
            'ai.default_provider' => 'fake',
            'ai.providers.fake.enabled' => false,
        ]);

        $this->expectException(\App\Modules\AI\Exceptions\AiGatewayException::class);
        $this->expectExceptionMessage('Fake AI provider is disabled.');

        app(AiGateway::class)->complete(new AiRequest(
            taskType: 'learner_mentor_hint',
            messages: [
                ['role' => 'user', 'content' => 'Help me debug this loop.'],
            ],
        ));
    }

    public function test_usage_logger_persists_token_counts(): void
    {
        config([
            'ai.default_provider' => 'fake',
            'ai.providers.fake.enabled' => true,
        ]);

        app(AiGateway::class)->complete(new AiRequest(
            taskType: 'learner_mentor_hint',
            messages: [
                ['role' => 'user', 'content' => 'Why is my repeat loop not running?'],
            ],
        ));

        $record = AiUsageRecord::query()->first();

        $this->assertNotNull($record);
        $this->assertGreaterThan(0, $record->prompt_tokens);
        $this->assertGreaterThan(0, $record->completion_tokens);
    }
}
