<?php

namespace Database\Seeders;

use App\Models\TransactionCharge;
use Illuminate\Database\Seeder;

class TransactionChargeSeeder extends Seeder
{
    public function run()
    {
        TransactionCharge::factory()->count(11)->create()
            ->each(function ($trc) {
                $trc->save();
            });
    }
}
