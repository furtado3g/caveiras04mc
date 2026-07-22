<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->text('full_address');
            $table->date('birth_date');
            $table->string('spouse_name')->nullable();
            $table->string('work_address')->nullable();
            $table->string('mobile_phone', 20);
            $table->string('emergency_contact_name');
            $table->string('emergency_contact_phone', 20);
            $table->boolean('previous_mc_member')->default(false);
            $table->string('previous_mc_name')->nullable();
            $table->date('club_join_date');
            $table->string('cpf')->unique();
            $table->string('rg')->nullable();
            $table->string('status')->default('member');
            $table->string('photo_path')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('birth_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
