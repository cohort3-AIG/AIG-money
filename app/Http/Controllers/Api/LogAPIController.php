<?php

namespace App\Http\Controllers\Api;

use Bavix\Wallet\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;

class LogAPIController extends Controller
{
    /** Display a listing of the resource. */
    public function index()
    {
        $transaction_logs = Transaction::all();

        return response()->json([
            'status'=> 200,
            'transactions'=> $transaction_logs,
        ]);
    }

    /** Display a listing of the resource. */
    public function myTransactions(Request $request)
    {
//        $user = $request->user()->id;
//        return $user;
        $user = User::find(1);
        return $user;
//        $myWallet = $user->wallet->get()->all();
//
//        return response()->json([
//            'status'=> 200,
//            'transactions'=> $myWallet,
//        ]);

    }
}
