<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionCategory extends Model
{
    use HasFactory;

    /** disable TimeStamps on this model. */
    public $timestamps = false;

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
//        'transaction_id',
        'category',
        'created_at',
        'updated_at'
    ];

    // Eloquent relationship to handle the one2Many relationship of 'transaction_categories ===>>> transactions'
    public function transactions() {
        // The 'transaction_categories' table being the one that's providing a PK to the 'transactions' table in the one2many relationship means that it takes on the hasMany() method
        return $this->hasMany(\App\Models\Transaction::class);   // THE MANY PART
    }
}
