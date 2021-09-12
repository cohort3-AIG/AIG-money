<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;
    public $timestamps = [ "created_at" ]; // enable only to created_at

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'sender_id',
        'payment_id',
        'transaction_id',
        'amount',
    ];


    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> transfers'
    public function user() {
        // The 'transfers' table being the one that's holding the FK to the 'users' table, means that it implements the belongsTo() method
        return $this->belongsTo(User::class);     // THE ONE PART
    }


    // Eloquent relationship to handle the one2one relationship of 'transfers <<==== transactions'
    public function transaction() {
        // The 'transfers' table being the one that's holding the FK to the 'transactions' table, means that it implements the belongsTo() method
        return $this->belongsTo(Transaction::class);     // THE ONE PART
    }

}
