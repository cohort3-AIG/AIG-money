<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentsTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();  // dates created and updated very applicable here...
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('agents');
    }
}
