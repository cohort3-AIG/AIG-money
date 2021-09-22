<?php

namespace App\Http\Controllers;

use Bavix\Wallet\Models\Wallet;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;

class WalletController extends BaseController
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

        $user = $request->user();
        $user->hasWallet('my-wallet');    // bool
        $wallet = $user->createWallet([   // if false, create
            'holder_id' => $user->id,
            'balance' => 0.0,
            'nationality' => $fields['nationality'],
            'address_line_1' => $fields['address_line_1'],
            'address_line_2' => $fields['address_line_2'],
            'city_town_village' => $fields['city_town_village'],
            'state_pronvince_region' => $fields['state_pronvince_region'],
            'postal_code' => $fields['postal_code'],
            'allow' => 0
        ]);

//        $wallet = new Wallet();
//        $wallet->holder_id = $request->user()->id;
//        $wallet->balance = 0.0;
//        $wallet->nationality = $fields['nationality'];
//        $wallet->address_line_1 = $fields['address_line_1'];
//        $wallet->address_line_2 = $fields['address_line_2'];
//        $wallet->city_town_village = $fields['city_town_village'];
//        $wallet->state_pronvince_region = $fields['state_pronvince_region'];
//        $wallet->postal_code = $fields['postal_code'];
//        $wallet->allow = 0;
//        $wallet->save();







        return ["wallet" => $wallet];
    }

    function get_wallet_data(Request $request)
    {
        if ($request->isMethod('get')) {


            $user = $request->user();
            if (isset($user)) {
                $user_account = $user->wallet;
                $user_account->first_name = $user->first_name;
                $user_account->last_name = $user->last_name;
                return $this->sendResponse([$user_account], 'Successfully.');
            }

        }
    }
}
