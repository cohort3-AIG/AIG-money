<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    public function run()
    {
        Country::factory()->count(11)->create()
            ->each(function ($country) {
                $country->save();
            });
    }
}
