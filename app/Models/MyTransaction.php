<?php

namespace App\Models;

use Bavix\Wallet\Models\Transaction;
use App\Models\TransactionCharge;

class MyTransaction extends Transaction
{
    protected $fillable = [
        'payable_type',
        'payable_id',
        'wallet_id',
        'holder_id',
        'amount',
        'transaction_id',
        'transaction_cat_id',
        'status',
        'reconciliation_id',
        'uuid',
        'type',
        'confirmed',
        'meta',
    ];

    protected $casts = [
        //
    ];

    protected $hidden = [
        'transaction_cat_id',
    ];

    public function transaction_charges(){
        return $this->hasOne(TransactionCharge::class)->ofMany([
            'published_at' => 'max',
            'id' => 'max',
        ], function ($query) {
            $query->where('published_at', '<', now());
        });
    }
}
