<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /** Run the database seeds. */
    public function run()
    {
        User::factory()->count(15)->create()
            ->each(function ($user) {
                $user->save();
            });
    }
}
