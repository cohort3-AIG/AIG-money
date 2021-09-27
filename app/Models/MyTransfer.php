<?php

namespace App\Models;

use Bavix\Wallet\Models\Transfer;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MyTransfer extends Transfer
{
    use HasFactory;

    protected $fillable = [
        'transfer_charge',
    ];
}
