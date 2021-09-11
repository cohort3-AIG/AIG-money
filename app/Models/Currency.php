<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    /** disable TimeStamps on this model. */
    public $timestamps = false;

    // m2m relationship
    public function countries() {
        // The 'currencies' table being in a m2m relationship with 'countries' must implement the hasMany() method
        return $this->hasMany(Country::class);
    }
}
