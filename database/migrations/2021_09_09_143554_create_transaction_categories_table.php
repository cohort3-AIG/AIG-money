<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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

        DB::table('transaction_categories')->insert([
            ['category' => 'card to wallet'],
            ['category' => 'wallet to wallet'],
            ['category' => 'wallet to mobile'],
            ['category' => 'wallet to card']
        ]);

    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('transaction_categories');
    }
}
