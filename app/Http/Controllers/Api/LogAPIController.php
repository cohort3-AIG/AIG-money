<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\MyTransaction;
use App\Models\MyWallet;
use App\Models\User;

class LogAPIController extends Controller
{
    /** Display a listing of the resource. */
    public function index()
    {
        $transaction_logs = MyTransaction::with('wallet')->get();  // eager loaded
        return response()->json([
            'all_transactions'=> $transaction_logs,
        ]);
    }

    /** Display a listing of the resource. */
    public function myTransactions(Request $request)
    {
        $my_transaction_logs = $request->user()->wallet->transactions;
        return response()->json([
            'my_transactions'=> $my_transaction_logs,
        ]);

//        $transaction_logs = MyWallet::with('transactions')->get();  // eager loaded
//        return response()->json([
//            'transactions'=> $transaction_logs,
//        ]);
//
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
