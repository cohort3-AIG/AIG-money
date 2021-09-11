<?php

namespace Database\Seeders;

use App\Models\Wallet;
use Illuminate\Database\Seeder;

class WalletSeeder extends Seeder
{
    public function run()
    {
        Wallet::factory()->count(11)->create()
            ->each(function ($wallet) {
                $wallet->save();
            });
    }
}
