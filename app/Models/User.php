<?php

namespace App\Models;

use Bavix\Wallet\Interfaces\Wallet;
use Bavix\Wallet\Models\Transaction;
use Bavix\Wallet\Traits\HasWallet;
use Bavix\Wallet\Traits\HasWallets;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Agent;
use App\Models\Log;
use App\Models\Beneficiary;


class User extends Authenticatable implements Wallet
{
    use HasApiTokens, HasFactory, Notifiable, HasWallet, HasWallets;

    /** The attributes that are mass assignable. @var string[] */
    public $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'password',
        'allow',
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

    public function agent()
    {
        return $this->hasOne(Agent::class);
    }

    public function logs()
    {
        return $this->hasMany(Log::class);
    }

    public function beneficiaries()
    {
        return $this->belongsToMany(Beneficiary::class);
    }
}
