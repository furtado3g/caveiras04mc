<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained()->cascadeOnDelete();
            $table->string('brand_model');
            $table->string('plate', 10);
            $table->smallInteger('year')->unsigned()->nullable();
            $table->string('color')->nullable();
            $table->smallInteger('engine_cc')->unsigned()->nullable();
            $table->string('renavam', 20)->nullable();
            $table->date('license_expiry')->nullable();
            $table->string('insurance_company')->nullable();
            $table->string('insurance_policy')->nullable();
            $table->date('insurance_expiry')->nullable();
            $table->timestamps();

            $table->index('member_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
