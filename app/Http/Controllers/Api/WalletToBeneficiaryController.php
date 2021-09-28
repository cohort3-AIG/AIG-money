<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Beneficiary;
use App\Models\User;
use Illuminate\Routing\Controller;

class WalletToBeneficiaryController extends Controller
{
    # xxx
    public function w2b(Request $request)
    {
//        $senderWallet = $request->user()->wallet;
        $phone = $request->input('phone_number');
        $beneficiaryWallet = Beneficiary::firstWhere('phone_number', $phone)->users->wallet;
////        $beneficiaryWallet = Beneficiary::with($request->user()->beneficiaries->phone_number, $request->input('phone_number'))->first()->wallet;
//        return $senderWallet->transfer($beneficiaryWallet, $request->input('amount'));

        return $beneficiaryWallet;

////        $phone = $request->input('phone_number');
////        $receiver = Beneficiary::where('phone_number', $phone)->first();
//        return Beneficiary::find(1)['first_name'];
    }
}
