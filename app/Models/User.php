<?php

namespace App\Models;

use Bavix\Wallet\Interfaces\Wallet;
use Bavix\Wallet\Traits\HasWallet;
use Bavix\Wallet\Traits\HasWallets;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable implements Wallet
{
    use HasApiTokens, HasFactory, Notifiable, HasWallet, HasWallets;

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'password',
        'allow'
    ];

    /** The attributes that should be hidden for serialization. @var array */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /** The attributes that should be cast. @var array */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    // Eloquent relationship to handle the one2one relationship of 'user ===>>> agent'
    public function agent()
    {
        return $this->hasOne(Agent::class);
    }

    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> logs'
    public function logs()
    {
        return $this->hasMany(Log::class);   // THE MANY PART
    }

    // m2m relationship
    public function beneficiaries()
    {
        return $this->belongsToMany(Beneficiary::class);
    }

//    public function wallet() {
//        return $this->hasOne(Wallet::class);
//    }
    
}
