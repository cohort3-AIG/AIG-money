<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beneficiary extends User
{
    use HasFactory;

    /** The attributes that are mass assignable. @var string[] */
    public $fillable = [
        'first_name',
        'last_name',
        'phone_number',
    ];

//    public function users()    // m2m
//    {
////        return $this->belongsToMany(
////                User::class,
////                'beneficiaries_users',
////                'beneficiary_id',
////                'user_id'
////        );
//
//        return $this->belongsToMany(User::class );
//    }
}
