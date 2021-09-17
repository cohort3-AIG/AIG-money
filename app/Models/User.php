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

    public $timestamps = false;

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'phone_number',
        'email',
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
        // The 'users' table being the one that's providing a PK to the 'agents' table in the one2one relationship means that it takes on the hasOne() method
        return $this->hasOne(Agent::class);
    }

    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> logs'
    public function logs()
    {
        // The 'users' table being the one that's providing a PK to the 'logs' table in the one2many relationship means that it takes on the hasMany() method
        return $this->hasMany(Log::class);   // THE MANY PART
    }

}
