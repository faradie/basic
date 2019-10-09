<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->string('id')->unique()->primary();
            $table->string('lecture_id');
            $table->string('course_id');
            $table->string('day');
            $table->string('minor');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestampTz('contract_time');
            $table->timestamps();

            $table->foreign('lecture_id')->references('id')->on('users')->onDelete('CASCADE');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classes');
    }
}
