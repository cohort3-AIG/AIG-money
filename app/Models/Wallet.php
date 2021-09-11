<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    /** disable TimeStamps on this model. */
    public $timestamps = false;

    // Eloquent relationship to handle the one2one relationship of 'user <<==== wallet'
    public function user() {
        // The 'wallets' table being the one that's holding the FK to the 'users' table, means that it implements the belongsTo() method
        return $this->belongsTo(User::class);     // THE ONE PART
    }

}
