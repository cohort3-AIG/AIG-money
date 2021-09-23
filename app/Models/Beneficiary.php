<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beneficiary extends Model
{
    use HasFactory;

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'phone_number',
    ];

    public function users()    // m2m
    {
        return $this->belongsToMany(
                User::class,
                'beneficiaries_users',
                'beneficiary_id',
                'user_id'
        );
}
}
