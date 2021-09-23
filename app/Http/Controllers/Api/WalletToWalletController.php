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

    // works
    public function walletBalanceOfAuthenticatedUser(Request $request)
    {
        $user = $request->user()->wallet;
        $authBal = $user->balance;
        return ["Current Balance of Logged in user is " => $authBal];
    }

    # works
    public function walletBalanceOfSpecificUser(Request $request)
    {
        $user = User::find($request->input('id'));
        $userBal = $user->balance;
        return ["Current Balance of selected user is " => $userBal];
    }

//    public function transferWalletToWallet(Request $request)
//    {
////        $sendingWallet = User::find($request->user());
//        $sendingWallet = User::find(1)->wallet;    // the logged-in user
//        $receivingWallet = User::find(2)->wallet;
//        return $sendingWallet->transfer($receivingWallet, 100);
//    }

    public function transferWalletToWallet(Request $request)
    {
        $sendingWallet = $request->user()->wallet;   // auth'd user
        $receivingWallet = User::find($request->input('id'))->wallet;

        // sender->transfer(to, amount)
        return $sendingWallet->transfer($receivingWallet, $request->input('amount'));
    }
}
