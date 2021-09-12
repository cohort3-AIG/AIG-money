<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('amount');
            $table->unsignedBigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('transaction_id');
            $table->foreign('transaction_id')->references('id')->on('transaction_categories')->onDelete('cascade');
//            $table->unsignedInteger('transaction_category');
//            $table->foreign('transaction_category')->references('category')->on('transaction_categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
