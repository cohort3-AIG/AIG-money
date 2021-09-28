<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\WalletToWalletRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\MyWallet;
use App\Exceptions\NumIncorrectOrSelfException;


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

    # works
    public function walletBalanceOfAuthenticatedUser(Request $request)
    {
        $user = $request->user()->wallet;
        $authBal = $user->balance;
        return ["balance" => $authBal];
    }

    # works
    public function walletBalanceOfSpecificUser(Request $request)
    {
        $user = User::find($request->input('id'));
        $userBal = $user->balance;
        return ["balance" => $userBal];
    }

    # works
    public function transferWalletToWallet(Request $request)
    {
//        $sender = $request->user()->wallet;
////      $receiver = User::find($request->input('id'));
//        $receiver = User::where('phone_number', $request->input('phone_number'))->first()->wallet;
//        return $sender->transfer($receiver, $request->input('amount'));

        $sender = $request->user()->wallet;

        // Check that entered num exists
        $phone = $request->input('phone_number');
        $receiver = User::where('phone_number', $phone)->first()->wallet;

        if($phone === $request->user()['phone_number'] || !User::where('phone_number',  $phone)->exists()) {
            return ["wallet num incorrect or self!"];  // false
//            abort(401, 'Bad params or incorrect data');
        }
        return $sender->transfer($receiver, $request->input('amount'));  // true
    }
}
