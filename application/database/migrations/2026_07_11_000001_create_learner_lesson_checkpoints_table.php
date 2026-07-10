<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('learner_lesson_checkpoints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('institution_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('lesson_slug');
            $table->string('step_key', 64);
            $table->timestamp('completed_at');
            $table->timestamps();

            $table->unique(['institution_id', 'user_id', 'lesson_slug', 'step_key']);
            $table->index(['user_id', 'lesson_slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('learner_lesson_checkpoints');
    }
};
