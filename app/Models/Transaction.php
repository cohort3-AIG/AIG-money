<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Transaction extends Model
{
    use HasFactory;
    public $timestamps = false;

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'user_id',
        'amount',
        'transaction_id',
        'transaction_cat_id',
        'status',
        'reconciliation_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
