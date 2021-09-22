<?php

namespace Database\Seeders;

use App\Models\Beneficiary;
use Illuminate\Database\Seeder;

class BeneficiarySeeder extends Seeder
{

    public function run()
    {
        Beneficiary::factory()->count(11)->create()
            ->each(function ($beneficiary) {
                $beneficiary->save();
            });
    }
}
