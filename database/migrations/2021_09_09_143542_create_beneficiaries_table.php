<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBeneficiariesTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->unsignedInteger('phone_number');
            $table->timestamps();   // dates added and dates updated are applicable here...
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('beneficiaries');
    }
}