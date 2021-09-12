<?php

namespace Database\Seeders;

use App\Models\PaymentType;
use Illuminate\Database\Seeder;

class PaymentTypeSeeder extends Seeder
{
    public function run()
    {
        PaymentType::factory()->count(11)->create()
            ->each(function ($pt) {
                $pt->save();
            });
    }
}
