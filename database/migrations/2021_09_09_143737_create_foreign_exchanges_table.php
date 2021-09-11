<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForeignExchangesTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('foreign_exchanges', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('forex_id');
            $table->foreign('forex_id')->references('id')->on('countries')->onDelete('cascade');
            $table->string('source_currency');
            $table->string('destination_currency');
            $table->unsignedInteger('rate');
            $table->string('country');
            $table->timestamps();   // updated_at and created_at are very applicable on this one.
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('foreign_exchanges');
    }
}
