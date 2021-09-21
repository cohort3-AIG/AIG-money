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
            $table->string('category');
            $table->unsignedInteger('charge');
            $table->timestamps();
        });

        DB::table('transaction_categories')->insert([
            ['category' => 'card to wallet','charge'=>0.05],
            ['category' => 'wallet to wallet','charge'=>0.01],
            ['category' => 'wallet to mobile','charge'=>0.01],
            ['category' => 'wallet to card','charge'=>0.01],
        ]);

    }

    /** Reverse the migrations. */
    public function down()
    {
        Schema::dropIfExists('transaction_categories');
    }
}