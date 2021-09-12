<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run()
    {
        Language::factory()->count(11)->create()
            ->each(function ($language) {
                $language->save();
            });
    }
}
