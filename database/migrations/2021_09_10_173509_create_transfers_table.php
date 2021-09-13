<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransfersTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('transfers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender_id');
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('payment_id');
            $table->unsignedBigInteger('transaction_id');
            $table->foreign('transaction_id')->references('transaction_id')->on('transactions')->onDelete('cascade');
            $table->unsignedInteger('amount');
            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('transfers');
    }

    // TODO :
    // Create or rather restructure the relationships in a way that;
    // If 'A' holds a PK, and 'B', has a FK to A, and 'C' has a relationship with 'B'
    // Laravel understands that 'C' is automatically related to A and therefore there shouldn't be a direct
    // definition of a relationship between 'C' & 'A'


}
