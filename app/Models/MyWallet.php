<?php

namespace App\Models;

use Bavix\Wallet\Models\Wallet;


class MyWallet extends Wallet
{
    protected $fillable = [
        'phone_number',
        'holder_type',
        'holder_id',
        'nationality',
        'address_line_1',
        'address_line_2',
        'city_town_village',
        'state_pronvince_region',
        'postal_code',
//        'allow',
//        'name',
//        'slug',
//        'description',
        'balance',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'decimal_places' => 'int',
        'meta' => 'json',
    ];

    /** The attributes that should be hidden for serialization. @var array */
    protected $hidden = [
//        'allow',
//        'name',
//        'slug',
//        'description',
    ];

}
