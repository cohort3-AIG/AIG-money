<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Log extends Model
{
    use HasFactory;
    public $timestamps = [ "created_at" ]; // enable only to created_at

    /** The attributes that are mass assignable. @var string[] */
    protected $fillable = [
        'user_id',
        'description',
    ];

    // Eloquent relationship to handle the one2Many relationship of 'user ===>>> logs'
    public function user() {
        // The 'logs' table being the one that's holding the FK to the 'users' table, means that it implements the belongsTo() method
        return $this->belongsTo(User::class);     // THE ONE PART
    }
}
