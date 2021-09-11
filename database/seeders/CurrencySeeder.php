<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    public function run()
    {
        Currency::factory()->count(11)->create()
            ->each(function ($currency) {
                $currency->save();
            });
    }
}
