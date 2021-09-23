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
        $myWallet = User::find(2)->wallet->transactions;

        return response()->json([
            'status'=> 200,
            'My-transactions'=> $myWallet,
        ]);
    }
}
