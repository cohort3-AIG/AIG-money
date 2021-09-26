<?php

namespace App\Models;

use function array_merge;
use Bavix\Wallet\Interfaces\Mathable;
use Bavix\Wallet\Interfaces\Wallet;
use App\Models\Wallet as WalletModel;
use App\Models\TransactionCharge;
use Bavix\Wallet\Services\WalletService;
use function config;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class Transaction.
 *
 * @property string $payable_type
 * @property int $payable_id
 * @property int $wallet_id
 * @property string $uuid
 * @property string $type
 * @property int|string $amount
 * @property float $amountFloat
 * @property bool $confirmed
 * @property array $meta
 * @property Wallet $payable
 * @property WalletModel $wallet
 */
class Transaction extends Model
{
    public const TYPE_DEPOSIT = 'deposit';
    public const TYPE_WITHDRAW = 'withdraw';

    /**
     * @var array
     */
    protected $fillable = [
        'charge',
        'reconciliation_id',
        'transaction_id',
        'transaction_cat_id',
        'payable_type',
//        'payable_id',
        'wallet_id',
//        'uuid',
//        'type',
        'amount',
//        'confirmed',
//        'meta',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'wallet_id' => 'int',
        'confirmed' => 'bool',
        'meta' => 'json',
    ];


    /** The attributes that should be hidden for serialization. @var array */
    protected $hidden = [
        'transaction_cat_id',
//        'payable_type',
        'payable_id',
        'uuid',
        'type',
        'confirmed',
        'meta',
    ];

    /**
     * {@inheritdoc}
     */
    public function getCasts(): array
    {
        return array_merge(
            parent::getCasts(),
            config('wallet.transaction.casts', [])
        );
    }

    /**
     * @return string
     */
    public function getTable(): string
    {
        if (! $this->table) {
            $this->table = config('wallet.transaction.table', 'transactions');
        }

        return parent::getTable();
    }

    /**
     * @return MorphTo
     */
    public function payable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return BelongsTo
     */
    public function wallet(): BelongsTo
    {
        return $this->belongsTo(config('wallet.wallet.model', WalletModel::class));
    }

    /**
     * @return int|float
     */
    public function getAmountFloatAttribute()
    {
        $decimalPlaces = app(WalletService::class)
            ->decimalPlaces($this->wallet);

        return app(Mathable::class)
            ->div($this->amount, $decimalPlaces);
    }

    /**
     * @param int|float $amount
     *
     * @return void
     */
    public function setAmountFloatAttribute($amount): void
    {
        $math = app(Mathable::class);
        $decimalPlaces = app(WalletService::class)
            ->decimalPlaces($this->wallet);

        $this->amount = $math->round($math->mul($amount, $decimalPlaces));
    }

    public function transaction_charges(){
        return $this->hasOne(App\Models\TransactionCharge::class)->ofMany([
            'published_at' => 'max',
            'id' => 'max',
        ], function ($query) {
            $query->where('published_at', '<', now());
        });
    }
}
