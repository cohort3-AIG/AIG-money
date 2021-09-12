<?php

namespace Database\Seeders;

use App\Models\TransactionCategory;
use Illuminate\Database\Seeder;

class TransactionCategorySeeder extends Seeder
{
    public function run()
    {
        TransactionCategory::factory()->count(11)->create()
            ->each(function ($tcg) {
                $tcg->save();
            });
    }
}
