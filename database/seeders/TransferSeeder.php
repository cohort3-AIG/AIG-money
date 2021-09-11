<?php

namespace Database\Seeders;

use App\Models\Transfer;
use Illuminate\Database\Seeder;

class TransferSeeder extends Seeder
{
    public function run()
    {
        Transfer::factory()->count(11)->create()
            ->each(function ($transfer) {
                $transfer->save();
            });
    }
}
