<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    public function run()
    {
        Transaction::factory()->count(11)->create()
            ->each(function ($transaction) {
                $transaction->save();
            });
    }
}
