<?php

namespace Database\Factories;

use App\Models\Beneficiary;
use Illuminate\Database\Eloquent\Factories\Factory;

class BeneficiaryFactory extends Factory
{
    protected $model = Beneficiary::class;

    public function definition()
    {
        return [
            'user_id' => $this->faker->randomNumber(1),
            'first_name' => $this->faker->name(),
            'last_name' => $this->faker->name(),
            'phone_number' => $this->faker->randomNumber(4),
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
