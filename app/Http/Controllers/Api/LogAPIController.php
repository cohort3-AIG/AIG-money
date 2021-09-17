<?php

namespace App\Http\Controllers\Api;

use Bavix\Wallet\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

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
}
