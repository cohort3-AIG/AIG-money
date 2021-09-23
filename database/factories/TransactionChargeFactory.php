<?php

namespace Database\Factories;

use App\Models\TransactionCharge;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionChargeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TransactionCharge::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
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
