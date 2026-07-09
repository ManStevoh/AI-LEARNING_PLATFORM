<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('block_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('institution_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('lesson_slug');
            $table->string('schema_version', 16)->default('1.0');
            $table->json('workspace');
            $table->text('generated_code')->nullable();
            $table->timestamp('last_saved_at')->nullable();
            $table->timestamps();

            $table->unique(['institution_id', 'user_id', 'lesson_slug']);
            $table->index(['user_id', 'lesson_slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('block_projects');
    }
};
