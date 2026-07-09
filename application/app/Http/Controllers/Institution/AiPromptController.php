<?php

namespace App\Http\Controllers\Institution;

use App\Http\Controllers\Controller;
use App\Http\Requests\Institution\SaveAiPromptVersionRequest;
use App\Modules\AI\Exceptions\AiGatewayException;
use App\Modules\AI\Models\AiPrompt;
use App\Modules\AI\Services\AiPromptManagementService;
use App\Support\Audit\AuditAction;
use App\Support\Audit\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AiPromptController extends Controller
{
    public function __construct(
        private AiPromptManagementService $promptManagementService,
        private AuditLogger $auditLogger,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Institution/Prompts/Index', [
            'prompts' => $this->promptManagementService->listSummaries(),
        ]);
    }

    public function show(AiPrompt $aiPrompt): Response
    {
        return Inertia::render('Institution/Prompts/Show', [
            'prompt' => $this->promptManagementService->toDetail($aiPrompt),
        ]);
    }

    public function storeVersion(SaveAiPromptVersionRequest $request, AiPrompt $aiPrompt): RedirectResponse
    {
        try {
            $version = $this->promptManagementService->saveDraft(
                $aiPrompt,
                $request->validated('version'),
                $request->validated(),
            );
        } catch (AiGatewayException $exception) {
            return redirect()
                ->route('institution.prompts.show', $aiPrompt)
                ->withErrors(['version' => $exception->getMessage()]);
        }

        $this->auditLogger->record(
            AuditAction::AI_PROMPT_DRAFT_SAVED,
            $request->user(),
            $aiPrompt,
            [
                'prompt_key' => $aiPrompt->prompt_key,
                'version' => $version->version,
            ],
            $request,
        );

        return redirect()
            ->route('institution.prompts.show', $aiPrompt)
            ->with('draftSaved', true);
    }

    public function publishVersion(AiPrompt $aiPrompt, string $version): RedirectResponse
    {
        abort_unless(preg_match('/^v\d+$/', $version) === 1, 404, 'Prompt version not found.');

        try {
            $published = $this->promptManagementService->publish($aiPrompt, $version);
        } catch (AiGatewayException $exception) {
            return redirect()
                ->route('institution.prompts.show', $aiPrompt)
                ->withErrors(['version' => $exception->getMessage()]);
        }

        $this->auditLogger->record(
            AuditAction::AI_PROMPT_VERSION_PUBLISHED,
            request()->user(),
            $aiPrompt,
            [
                'prompt_key' => $aiPrompt->prompt_key,
                'version' => $published->version,
            ],
            request(),
        );

        return redirect()
            ->route('institution.prompts.show', $aiPrompt)
            ->with('versionPublished', true);
    }
}
