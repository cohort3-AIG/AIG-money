<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionCategoriesTable extends Migration
{
    /** Run the migrations. */
    public function up()
    {
        Schema::create('transaction_categories', function (Blueprint $table) {
            $table->id();
//            $table->unsignedBigInteger('transaction_id');   // ???????????
            $table->string('category');
            $table->timestamps();
        });
    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('transaction_categories');
    }
}
