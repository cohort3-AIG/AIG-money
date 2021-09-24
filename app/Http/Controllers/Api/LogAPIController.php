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
        $transaction_logs = Transaction::with('wallet')->get();  // eager loaded
        return response()->json([
            'transactions'=> $transaction_logs,
        ]);
    }

    /** Display a listing of the resource. */
    public function myTransactions(Request $request)
    {
        $user = $request->user();
//        $my_transactions = Transaction::with('wallet')->get()->$user;  // eager loaded
        $my_transactions = Transaction::where("wallet_id", $user->wallet->holder_id)->get()->all();
        return response()->json([
            'status'=> 200,
            'My-transactions'=> $my_transactions,
        ]);
    }
}
