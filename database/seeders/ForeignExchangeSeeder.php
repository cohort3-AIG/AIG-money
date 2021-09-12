<?php

namespace Database\Seeders;

use App\Models\ForeignExchange;
use Illuminate\Database\Seeder;

class ForeignExchangeSeeder extends Seeder
{
    public function run()
    {
        ForeignExchange::factory()->count(11)->create()
            ->each(function ($forex) {
                $forex->save();
            });
    }
}
