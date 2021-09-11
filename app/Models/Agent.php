<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;

    // Eloquent relationship to handle the one2one relationship of 'user <<==== agent'
    public function user() {
        // The 'agents' table being the one that's holding the FK to the 'users' table, means that it implements the belongsTo() method
        return $this->belongsTo(User::class);     // THE ONE PART
    }

}
