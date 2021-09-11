<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    public $timestamps = false;

    // Eloquent relationship to handle the one2one relationship of 'user ===>>> agent'
    public function agent() {
        // The 'users' table being the one that's providing a PK to the 'agents' table in the one2one relationship means that it takes on the hasOne() method
        return $this->hasOne(Agent::class);
    }

    // m2m relationship
    public function beneficiaries() {
        // The 'users' table being in a m2m relationship with 'beneficiaries' must implement the belongsToMany() method
        return $this->belongsToMany(Beneficiary::class);
    }

    // Eloquent relationship to handle the one2one relationship of 'user <<=== wallet'
    public function wallet() {
        // The 'users' table being the one that's providing a PK to the 'wallets' table in the one2one relationship means that it takes on the hasOne() method
        return $this->hasOne(Wallet::class);
    }

    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> logs'
    public function logs() {
        // The 'users' table being the one that's providing a PK to the 'logs' table in the one2many relationship means that it takes on the hasMany() method
        return $this->hasMany(Log::class);   // THE MANY PART
    }

    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> transactions'
    public function transactions() {
        // The 'users' table being the one that's providing a PK to the 'transactions' table in the one2many relationship means that it takes on the hasMany() method
        return $this->hasMany(Transaction::class);   // THE MANY PART
    }

    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> transfers'
    public function transfers() {
        // The 'users' table being the one that's providing a PK to the 'transfers' table in the one2many relationship means that it takes on the hasMany() method
        return $this->hasMany(Transfer::class);   // THE MANY PART
    }
}
