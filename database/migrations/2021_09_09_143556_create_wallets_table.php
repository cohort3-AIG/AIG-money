<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWalletsTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();     // one2one r/ship
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedFloat('balance');
            $table->string('nationality');
            $table->string('address_line_1');
            $table->string('address_line_2');
            $table->string('city_town_village');
            $table->string('state_pronvince_region');
            $table->unsignedInteger('postal_code');
            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('wallets');
    }
}
