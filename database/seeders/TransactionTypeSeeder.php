<?php

namespace Database\Seeders;

use App\Models\TransactionType;
use Illuminate\Database\Seeder;

class TransactionTypeSeeder extends Seeder
{
    public function run()
    {
        TransactionType::factory()->count(11)->create()
            ->each(function ($ttype) {
                $ttype->save();
            });
    }
}
