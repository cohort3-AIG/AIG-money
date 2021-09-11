<?php

namespace Database\Factories;

use App\Models\Currency;
use Illuminate\Database\Eloquent\Factories\Factory;

class CurrencyFactory extends Factory
{
    protected $model = Currency::class;

    public function definition()
    {
        return [
            'currency_id' => $this->faker->randomNumber(1),
            'code' => $this->faker->currencyCode,
            'full_name' => $this->faker->currencyCode(),
            'country' => $this->faker->country,
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
