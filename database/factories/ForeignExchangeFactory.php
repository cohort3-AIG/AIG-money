<?php

namespace Database\Factories;

use App\Models\ForeignExchange;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForeignExchangeFactory extends Factory
{
    protected $model = ForeignExchange::class;

    public function definition()
    {
        return [
            'forex_id' => $this->faker->randomNumber(1),
            'source_currency' => $this->faker->name(),
            'destination_currency' => $this->faker->name(),
            'rate' => $this->faker->randomNumber(2),
            'country' => $this->faker->name(),
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
