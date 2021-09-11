<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionCharge extends Model
{
    use HasFactory;

    /** disable TimeStamps on this model. */
    public $timestamps = false;

    // Eloquent relationship to handle the one2one relationship of 'transaction_charge <<==== transaction_type'
    public function transaction_type() {
        // The 'transaction_charges' table being the one that's holding the FK to the 'transaction_types' table, means that it implements the belongsTo() method
        return $this->belongsTo(TransactionType::class);     // THE ONE PART
    }

}
