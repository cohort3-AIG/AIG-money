<?php

namespace Database\Factories;

use App\Models\Log;
use Illuminate\Database\Eloquent\Factories\Factory;

class LogFactory extends Factory
{
    protected $model = Log::class;

    public function definition()
    {
        return [
            'user_id' => $this->faker->randomNumber(1),
            'description' => $this->faker->sentence,
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
