<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('birthday_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('file_path');
            $table->integer('circle_x')->unsigned();
            $table->integer('circle_y')->unsigned();
            $table->integer('circle_diameter')->unsigned();
            $table->integer('name_text_x')->unsigned();
            $table->integer('name_text_y')->unsigned();
            $table->integer('name_text_max_width')->unsigned();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('birthday_templates');
    }
};
