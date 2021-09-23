<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\WalletToWalletRequest;
use Bavix\Wallet\Models\Transaction;
use Bavix\Wallet\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
//use Bavix\Wallet\Test\Common\Models\Transfer;
use App\Models\User;


class WalletToWalletController extends Controller
{
    public function addToAuthWallet(Request $request)    // TOP MONEY TO WALLET of auth user
    {
        $user = $request->user();
        return ["Deposited " . $user->deposit($request->input('amount'))['amount'] . " to the Wallet of " . $user->first_name];
    }

    # works
    public function addToSomeWallet(Request $request)    // TOP MONEY TO WALLET of named user
    {
        $user = User::find($request->input('id'));
//        $user->id=$request->id;
        return ["Deposited " . $user->deposit(300)['amount'] . " to the Wallet of " . $user->first_name];
    }

    public function walletBalanceOfAuthenticatedUser(Request $request)   // VIEW BALANCE of A logged-in USER
    {
        $user = User::find($request->user());  // find logged-in user
        $user->id=$request->id;
        return ["Current Balance of Logged in user is " => $user->wallet->get()->last()->balance];
    }

    # works
    public function walletBalanceOfSpecificUser(Request $request)   // VIEW BALANCE of A named USER
    {
        $user = User::find($request->input('id'));   // return the user of specified 'id'
        return ["Current Balance of selected user is " => $user->wallet->get()->last()->balance];
    }

    public function transferWalletToWallet(Request $request)   // TRANSFER money from auth wallet to named wallet
    {
//        $sendingWallet = User::find($request->user());    // the logged-in user
        $sendingWallet = User::find(1);    // the logged-in user
        $receivingWallet = User::find($request->input('id'));   // user of entered 'id'
        return $sendingWallet->transfer($receivingWallet, $request->input('amount'));  // send input amount
    }
}
