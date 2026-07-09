<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->string('status')->default('active')->index();
            $table->timestamps();
        });

        Schema::create('concepts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('domain_id')->constrained()->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('concept_id')->constrained()->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('statement');
            $table->unsignedSmallInteger('learning_level')->default(1);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->json('metadata')->nullable();
            $table->string('status')->default('active')->index();
            $table->timestamps();
        });

        Schema::create('skill_relationships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('source_skill_id')->constrained('skills')->cascadeOnDelete();
            $table->foreignId('target_skill_id')->constrained('skills')->cascadeOnDelete();
            $table->string('relationship_type')->default('requires');
            $table->timestamps();

            $table->unique(['source_skill_id', 'target_skill_id', 'relationship_type'], 'skill_relationship_unique');
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('learning_level')->default(1);
            $table->string('age_band')->nullable();
            $table->string('version')->default('1.0.0');
            $table->string('status')->default('draft')->index();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->json('metadata')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('course_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->unique(['course_id', 'slug']);
        });

        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_module_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('title');
            $table->text('summary')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->string('status')->default('draft')->index();
            $table->unsignedSmallInteger('estimated_minutes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->unique(['course_module_id', 'slug']);
        });

        Schema::create('lesson_skill_mappings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->foreignId('skill_id')->constrained()->cascadeOnDelete();
            $table->string('role')->default('primary');
            $table->timestamps();

            $table->unique(['lesson_id', 'skill_id', 'role']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_skill_mappings');
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('course_modules');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('skill_relationships');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('concepts');
        Schema::dropIfExists('domains');
    }
};
