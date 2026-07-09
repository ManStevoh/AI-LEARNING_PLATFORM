<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('block_project_backdrops', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('institution_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('lesson_slug');
            $table->string('name');
            $table->string('disk', 32)->default('local');
            $table->string('path');
            $table->string('mime_type', 128);
            $table->unsignedInteger('size_bytes');
            $table->string('original_filename');
            $table->timestamps();

            $table->index(['institution_id', 'user_id', 'lesson_slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('block_project_backdrops');
    }
};
