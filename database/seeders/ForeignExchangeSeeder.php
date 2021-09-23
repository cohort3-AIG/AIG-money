<?php

namespace Database\Seeders;

use App\Models\ForeignExchange;
use Illuminate\Database\Seeder;

class ForeignExchangeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ForeignExchange::factory()->count(11)->create()
            ->each(function ($forex) {
                $forex->save();
            });
    }
}
