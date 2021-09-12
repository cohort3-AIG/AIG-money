<?php

namespace Database\Factories;

use App\Models\TransactionType;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionTypeFactory extends Factory
{
    protected $model = TransactionType::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
