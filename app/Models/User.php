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


    // users
    public function users()    // m2m
    {
        return $this->belongsToMany(
            __CLASS__,
            'beneficiary_user',
            'beneficiary_id',
            'user_id');
    }

    // beneficiaries
    public function beneficiaries()    // m2m
    {
        return $this->belongsToMany(
            __CLASS__,
            'beneficiary_user',
            'user_id',
            'beneficiary_id');
//        return $this->belongsToMany(Beneficiary::class);
    }

    public function add_beneficiary($beneficiary_id)
    {
        return $this->beneficiaries()->attach($beneficiary_id);   // add beneficiary
//        $beneficiary = self::find($beneficiary_id);       // find your beneficiary, and...
//        $beneficiary->beneficiaries()->attach($this->id);  // add yourself, too
////
//        return $this->beneficiaries()->attach($beneficiary_id);   // add beneficiary
    }

    public function remove_beneficiary(Beneficiary $beneficiary_id)
    {
        $this->beneficiaries()->detach($beneficiary_id);   // remove beneficiary
        $beneficiary = self::find($beneficiary_id);       // find your beneficiary, and...
        $beneficiary->beneficiaries()->detach($this->id);  // remove yourself, too
    }
}
