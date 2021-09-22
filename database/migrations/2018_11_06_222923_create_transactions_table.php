<?php

use Bavix\Wallet\Models\Transaction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\MySqlConnection;
use Illuminate\Database\PostgresConnection;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Fluent as ColumnDefinition;

class CreateTransactionsTable extends Migration
{
    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create($this->table(), function (Blueprint $table) {

            $table->bigIncrements('id');
//            $table->morphs('payable');    // this is to be returned in the near future.
            $table->string('payable_type')->nullable();
            $table->string('payable_id')->nullable();
            $table->enum('type', ['deposit', 'withdraw'])->index()->nullable();
            $table->decimal('amount', 64, 0);
            $table->unsignedBigInteger('holder_id')->unsigned()->nullable();
            $table->foreign('holder_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('status')->nullable();
            $table->string('reconciliation_id')->nullable();
            $table->string('transaction_id')->nullable();
            $table->unsignedBigInteger('transaction_cat_id')->nullable();
            $table->foreign('transaction_cat_id')->references('id')->on('transaction_categories')->onDelete('cascade');

            $table->boolean('confirmed')->nullable();
            $this->json($table, 'meta')->nullable();
            $table->uuid('uuid')->unique()->nullable();
            $table->timestamps();

            $table->index(['payable_type', 'payable_id', 'type'], 'payable_type_ind');
            $table->index(['payable_type', 'payable_id', 'confirmed'], 'payable_confirmed_ind');
            $table->index(['payable_type', 'payable_id', 'type', 'confirmed'], 'payable_type_confirmed_ind');

        });
    }

    /**
     * @param Blueprint $table
     * @param string $column
     * @return ColumnDefinition
     */
    public function json(Blueprint $table, string $column): ColumnDefinition
    {
        $conn = DB::connection();
        if ($conn instanceof MySqlConnection || $conn instanceof PostgresConnection) {
            $pdo = $conn->getPdo();
            try {
                $sql = 'SELECT JSON_EXTRACT(\'[10, 20, [30, 40]]\', \'$[1]\');';
                $prepare = $pdo->prepare($sql);
                $prepare->fetch();
            } catch (\Throwable $throwable) {
                return $table->text($column);
            }
        }

        return $table->json($column);
    }

    /**
     * @return string
     */
    protected function table(): string
    {
        return (new Transaction())->getTable();
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::drop($this->table());
    }
}
