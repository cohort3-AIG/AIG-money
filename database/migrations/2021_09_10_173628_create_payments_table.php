<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('payment_type_id');
            $table->unsignedBigInteger('payment_id');   // ->unique();
            $table->foreign('payment_id')->references('id')->on('transactions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
