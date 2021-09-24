<?php

namespace App\Http\Controllers\Api;

use Bavix\Wallet\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;
use phpDocumentor\Reflection\DocBlock\Tags\Return_;


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
        return $request->user()->transactions;



//        return $this->myTransactions;
////        return response()->json([
////            'status'=> 200,
////            'My-transactions'=> $my_transactions,
//        ]);
    }


    /** Display a listing of the resource. */
    public function myTransfers(Request $request)
    {
        return $request->user()->wallet->transfers;
    }
}
