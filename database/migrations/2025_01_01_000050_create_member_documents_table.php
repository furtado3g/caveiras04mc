<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('member_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->string('number')->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('file_path');
            $table->timestamps();

            $table->index(['member_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('member_documents');
    }
};
