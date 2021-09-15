<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    // public $timestamps = [ "created_at" ]; // enable only to created_at
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


    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> transactions'
    public function user() {
        // The 'transactions' table being the one that's holding the FK to the 'users' table, means that it implements the belongsTo() method
        return $this->belongsTo(User::class);     // THE ONE PART
    }

    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> transaction_categories'
    public function transaction_category() {
        // The 'transactions' table being the one that's holding the FK to the 'transaction_categories' table, means that it implements the belongsTo() method
        return $this->belongsTo(TransactionCategory::class);     // THE ONE PART
    }


    // Eloquent relationship to handle the one2one relationship of 'transactions ===>>> transfers'
    public function transfers() {
        // The 'transactions' table being the one that's providing a PK to the 'transfers' table in the one2one relationship means that it takes on the hasOne() method
        return $this->hasOne(Transfer::class);
    }
}
