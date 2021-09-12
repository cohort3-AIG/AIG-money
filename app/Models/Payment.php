<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    public $timestamps = [ "created_at" ]; // enable only to created_at

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'payment_type_id',
        'transaction_id',
    ];
}
