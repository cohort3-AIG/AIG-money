<?php

namespace Database\Seeders;

use App\Models\Agent;
use Illuminate\Database\Seeder;

class AgentSeeder extends Seeder
{
    public function run()
    {
        Agent::factory()->count(11)->create()
            ->each(function ($agent) {
                $agent->save();
            });
    }
}
