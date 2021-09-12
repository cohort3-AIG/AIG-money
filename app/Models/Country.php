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
    ];


    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> foreign_exchanges'
    public function foreign_exchanges() {
        // The 'countries' table being the one that's providing a PK to the 'foreign_exchanges' table in the one2many relationship means that it takes on the hasMany() method
        return $this->hasMany(ForeignExchange::class);   // THE MANY PART
    }

    // m2m relationship
    public function currencies() {
        // The 'countries' table being in a m2m relationship with 'currencies' must implement the belongsToMany() method
        return $this->belongsToMany(Currency::class);
    }

    // m2m relationship
    public function languages() {
        // The 'countries' table being in a m2m relationship with 'languages' must implement the hasMany() method
        return $this->hasMany(Language::class);
    }
}
