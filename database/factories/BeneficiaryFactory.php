<?php

namespace Database\Factories;

use App\Models\Beneficiary;
use Illuminate\Database\Eloquent\Factories\Factory;

class BeneficiaryFactory extends Factory
{
    /** The name of the factory's corresponding model. @var string */
    protected $model = Beneficiary::class;

    /** Define the model's default state. @return array */
    public function definition()
    {
        return [
            'user_id' => $this->faker->randomNumber(1),
            'first_name' => $this->faker->firstName,
//            'middle_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'phone_number' => $this->faker->randomNumber(4),
            'created_at' => $this->faker->dateTimeThisMonth(),
            'updated_at' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
