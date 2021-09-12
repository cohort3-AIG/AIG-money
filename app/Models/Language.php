<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    /** disable TimeStamps on this model. */
    public $timestamps = false;


    // m2m relationship
    public function countries() {
        // The 'languages' table being in a m2m relationship with 'countries' must implement the belongsToMany() method
        return $this->belongsToMany(Country::class);
    }
}
