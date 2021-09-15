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
            
            $table->string('status');
            $table->string('reconciliation_id');
            $table->string('transaction_id');
            $table->unsignedBigInteger('transaction_cat_id');
            $table->foreign('transaction_cat_id')->references('id')->on('transaction_categories')->onDelete('cascade');
            //table->unsignedInteger('transaction_category');
             //$table->foreign('transaction_category')->references('category')->on('transaction_categories')->onDelete('cascade');
            // $table->timestamps();
            $table->timestamp('date')->useCurrent = true;
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
