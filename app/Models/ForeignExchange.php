<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForeignExchange extends Model
{
    use HasFactory;

    // Eloquent relationship to handle the Many2one relationship of 'user ===>>> foreign_exchanges'
    public function country() {
        // The 'foreign_exchanges' table being the one that's holding the FK to the 'countries' table, means that it implements the belongsTo() method
        return $this->belongsTo(Country::class);     // THE ONE PART
    }
}
