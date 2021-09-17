<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionChargesTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        // to be removed
        Schema::create('transaction_charges', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('charge');
            $table->unsignedBigInteger('transaction_type_id')->unique();
            $table->foreign('transaction_type_id')->references('id')->on('transaction_types')->onDelete('cascade');
//            $table->unsignedBigInteger('transaction_category_id');       // This is to be dropped from our SDD schema
            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('transaction_charges');
    }
}
