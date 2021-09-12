<?php

namespace Database\Factories;

use App\Models\Transfer;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransferFactory extends Factory
{
    protected $model = Transfer::class;

    public function definition()
    {
        return [
            'sender_id' => $this->faker->randomNumber(1),
            'payment_id' => $this->faker->randomNumber(1),
            'transaction_id' => $this->faker->randomNumber(1),
            'amount' => $this->faker->randomNumber(2),
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
