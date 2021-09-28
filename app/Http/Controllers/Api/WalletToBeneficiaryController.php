<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Beneficiary;
use App\Models\User;
use Illuminate\Routing\Controller;

class WalletToBeneficiaryController extends Controller
{
    public function add_to_my_beneficiaries(Request $request, User $beneficiary_id){
        $user = $request->user();
        return $user->add_beneficiary($request->input('beneficiary_id'));
    }

    public function bless_new_beneficiary(Request $request, User $beneficiary_id){
        $senderWallet = $request->user()->wallet; // works
        $beneficiaryWallet = $request->user()->beneficiaries->find($request->input('beneficiary_id'))->wallet;  // beneficiary wallet
        return $senderWallet->transfer($beneficiaryWallet, $request->input('amount'));

//        return $beneficiaryWallet;

//        $beneficiaryWallet = User::firstWhere(User, $phone)->users->wallet;
////        $beneficiaryWallet = Beneficiary::with($request->user()->beneficiaries->phone_number, $request->input('phone_number'))->first()->wallet;
////        return $senderWallet->transfer($beneficiaryWallet, $request->input('amount'));
    }

    public function check_beneficiary_wallet(Request $request){
        return User::find($request->input('beneficiary_id'))->wallet;
    }
}
