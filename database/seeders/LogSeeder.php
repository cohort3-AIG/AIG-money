<?php

namespace Database\Seeders;

use App\Models\Log;
use Illuminate\Database\Seeder;

class LogSeeder extends Seeder
{
    public function run()
    {
        Log::factory()->count(11)->create()
            ->each(function ($log) {
                $log->save();
            });
    }
}
