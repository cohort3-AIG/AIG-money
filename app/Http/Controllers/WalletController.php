<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    function create(Request $request)
    {
        $fields = $request->validate(
            [
                'nationality' => "required|string",
                'address_line_1' => "string|required",
                'address_line_2' => "string|required",
                'city_town_village' => "string|required",
                'state_pronvince_region' => "string|required",
                'postal_code' => "numeric|required"
            ]
        );
        $wallet = new Wallet();
        $wallet->user_id = $request->user()->id;
        $wallet->balance = 0.0;
        $wallet->nationality = $fields['nationality'];
        $wallet->address_line_1 = $fields['address_line_1'];
        $wallet->address_line_2 = $fields['address_line_2'];
        $wallet->city_town_village = $fields['city_town_village'];
        $wallet->state_pronvince_region = $fields['state_pronvince_region'];
        $wallet->postal_code = $fields['postal_code'];
        $wallet->save();
        return [
            "wallet" => $wallet
        ];
    }
}
