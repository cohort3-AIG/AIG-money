<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    /** disable TimeStamps on this model. */
    public $timestamps = false;

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'currency_id',
        'code',
        'full_name',
        'country',
        'created_at',
        'updated_at'
    ];

    // m2m relationship
    public function countries() {
        // The 'currencies' table being in a m2m relationship with 'countries' must implement the hasMany() method
        return $this->hasMany(Country::class);
    }
}
