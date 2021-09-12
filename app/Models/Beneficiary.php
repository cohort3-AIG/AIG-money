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

    // m2m relationship
    public function users() {
        // The 'beneficiaries' table being in a m2m relationship with 'users' must implement the belongsToMany() method
        return $this->belongsToMany(User::class);
    }
}
