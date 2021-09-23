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
        $user = User::find(Auth::user());
//        $user->id=$request->id;
        return ["Deposited " . $user->deposit(500)['amount'] . " to the Wallet of " . $user->first_name];
    }

    public function addToSomeWallet(Request $request)    // TOP MONEY TO WALLET of named user
    {
        $user = User::find(1);
//        $user->id=$request->id;
        return ["Deposited " . $user->deposit(300)['amount'] . " to the Wallet of " . $user->first_name];
    }

    public function walletBalanceOfAuthenticatedUser(Request $request)   // VIEW BALANCE of A logged-in USER
    {
        $user = User::find($request->user());  // find logged-in user
        $user->id=$request->id;
        return ["Current Balance" => $user->balance];
    }

    public function walletBalanceOfSpecificUser(Request $request)   // VIEW BALANCE of A named USER
    {
        $user = User::find($request->id);   // return the user of specified 'id'
        $user->id=$request->id;
//        $user_wallet = Wallet::where("holder_id",$user->id)->get();
        return ["Current Balance" => $user->wallet->get()->last()->balance];
    }

    public function transferWalletToWallet(Request $request)   // TRANSFER money from auth wallet to named wallet
    {
//        $sendingWallet = $request->user();    // the logged-in user
//        return [$sendingWallet];
        $sendingWallet = User::find(1);    // the logged-in user
        $receivingWallet = User::find($request->input('id'));   // user of entered 'id'
        return $sendingWallet->transfer($receivingWallet, $request->input('amount'));  // send input amount
    }
}
