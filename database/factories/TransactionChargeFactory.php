<?php

namespace Database\Factories;

use App\Models\TransactionCharge;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionChargeFactory extends Factory
{
    protected $model = TransactionCharge::class;

    public function definition()
    {
        return [
            'charge' => $this->faker->randomNumber(2),
            'transaction_type_id' => $this->faker->randomNumber(1),
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
