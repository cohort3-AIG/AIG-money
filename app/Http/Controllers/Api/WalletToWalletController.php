<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\WalletToWalletRequest;
use Bavix\Wallet\Models\Transaction;
use Bavix\Wallet\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class WalletToWalletController extends Controller
{
    public function addToAuthWallet(Request $request)
    {
        $user = $request->user();
        return ["Deposited " . $user->deposit($request->input('amount'))['amount'] . " to the Wallet of " . $user->first_name];
    }

    # works
    public function addToSomeWallet(Request $request)
    {
        $user = User::find($request->input('id'));
//        $user->id=$request->id;
        return ["Deposited " . $user->deposit(300)['amount'] . " to the Wallet of " . $user->first_name];
    }

    public function walletBalanceOfAuthenticatedUser(Request $request)
    {
        $user = User::find($request->user()->id);
        $user->id = $request->id;
        return ["balance" => $user->wallet->get()->last()->balance];
    }

    # works
    public function walletBalanceOfSpecificUser(Request $request)
    {
        $user = User::find($request->input('id'));
        $user->id = $request->id;
        return ["Current Balance of selected user is " => $user->wallet->get()->last()->balance];
    }

    public function transferWalletToWallet(Request $request)
    {
//        $sendingWallet = User::find($request->user());
        $sendingWallet = User::find(1)->wallet;    // the logged-in user
        $receivingWallet = User::find(2)->wallet;
        return $sendingWallet->transfer($receivingWallet, 500);
    }

//    public function transferWalletToWallet(Request $request)
//    {
////        $sendingWallet = User::find($request->user());
//        $sendingWallet = User::find(1)->wallet;    // the logged-in user
//        $receivingWallet = User::find($request->input('id'))->wallet;
//        return $sendingWallet->transfer($receivingWallet, $request->input('amount'));
//    }
}
