<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('block_project_feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('block_project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('institution_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teacher_user_id')->constrained('users')->cascadeOnDelete();
            $table->text('notes');
            $table->timestamps();

            $table->unique('block_project_id');
            $table->index(['institution_id', 'updated_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('block_project_feedback');
    }
};
