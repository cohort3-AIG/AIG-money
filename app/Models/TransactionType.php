<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionType extends Model
{
    use HasFactory;

    /** disable TimeStamps on this model. */
    public $timestamps = false;


    // Eloquent relationship to handle the one2one relationship of 'transaction_charge ===>>> transaction_charges'
    public function transaction_charge() {
        // The 'transaction_types' table being the one that's providing a PK to the 'transaction_charges' table in the one2one relationship means that it takes on the hasOne() method
        return $this->hasOne(TransactionCharge::class);
    }
}
