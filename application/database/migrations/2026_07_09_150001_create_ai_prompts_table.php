<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_prompts', function (Blueprint $table) {
            $table->id();
            $table->string('prompt_key')->unique();
            $table->string('name');
            $table->string('owner')->default('platform');
            $table->text('purpose')->default('');
            $table->string('status')->default('active');
            $table->timestamps();
        });

        Schema::create('ai_prompt_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ai_prompt_id')->constrained('ai_prompts')->cascadeOnDelete();
            $table->string('version');
            $table->text('system_template');
            $table->text('developer_template')->nullable();
            $table->text('user_template');
            $table->json('input_schema')->nullable();
            $table->json('output_schema')->nullable();
            $table->json('safety_rules')->nullable();
            $table->unsignedBigInteger('evaluation_set_id')->nullable();
            $table->text('changelog')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->unique(['ai_prompt_id', 'version']);
            $table->index(['ai_prompt_id', 'published_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_prompt_versions');
        Schema::dropIfExists('ai_prompts');
    }
};
