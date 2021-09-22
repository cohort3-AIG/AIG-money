<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Transaction extends Model
{
    use HasFactory;


    /** The attributes that are mass assignable. @var string[] */
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

    public function user() {
        return $this->belongsTo(User::class);
    }
}
