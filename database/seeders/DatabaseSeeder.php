<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /** Seed the application's database. */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(UserSeeder::class);   // call this first
        $this->call(AgentSeeder::class);     // call second
        $this->call(BeneficiarySeeder::class);  // etc...
        $this->call(CountrySeeder::class);
        $this->call(CurrencySeeder::class);
        $this->call(ForeignExchangeSeeder::class);
        $this->call(LogSeeder::class);
        $this->call(PaymentTypeSeeder::class);
        $this->call(TransactionCategorySeeder::class);
        $this->call(TransactionTypeSeeder::class);
        $this->call(TransactionChargeSeeder::class);
        $this->call(TransactionSeeder::class);
        $this->call(TransferSeeder::class);
        $this->call(WalletSeeder::class);
    }
}

