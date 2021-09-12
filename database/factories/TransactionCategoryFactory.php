<?php

namespace Database\Factories;

use App\Models\TransactionCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionCategoryFactory extends Factory
{
    protected $model = TransactionCategory::class;

    public function definition()
    {
        return [
            'category' => $this->faker->word,
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
