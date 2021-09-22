<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    /** disable TimeStamps on this model. */
    public $timestamps = false;

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'country_code',
        'name',
        'created_at',
        'updated_at'
    ];

    // m2m relationship
    public function currencies() {
        // The 'countries' table being in a m2m relationship with 'currencies' must implement the belongsToMany() method
        return $this->belongsToMany(Currency::class);
    }
}
