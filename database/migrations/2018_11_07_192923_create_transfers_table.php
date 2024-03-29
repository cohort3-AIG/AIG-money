<?php

use App\Models\MyTransaction;
use Bavix\Wallet\Models\Transfer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransfersTable extends Migration
{
    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create($this->table(), function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->morphs('from');
            $table->morphs('to');
//            $table->unsignedBigInteger('from_id');
//            $table->string('from_type');
//            $table->unsignedBigInteger('to_id');
//            $table->string('to_type');
            //$table->unsignedInteger('deposit_id');
           // $table->unsignedInteger('withdraw_id');
            $table->uuid('uuid')->unique();
            $table->timestamps();

            $table->foreignId('deposit_id')->references('id')->on($this->transactionTable())->onDelete('cascade');
            $table->foreignId('withdraw_id')->references('id')->on($this->transactionTable())->onDelete('cascade');
        });
    }

    /**
     * @return string
     */
    protected function table(): string
    {
        return (new Transfer())->getTable();
    }

    /**
     * @return string
     */
    protected function transactionTable(): string
    {
        return (new MyTransaction())->getTable();
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::drop($this->table());
    }
}
