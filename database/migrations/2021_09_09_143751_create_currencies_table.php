<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrenciesTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('currency_id');
            $table->foreign('currency_id')->references('id')->on('countries')->onDelete('cascade');
            $table->string('code');
            $table->string('full_name');
            $table->string('country');
            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('currencies');
    }
}
