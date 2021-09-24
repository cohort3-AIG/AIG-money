<?php

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateWalletsTable extends Migration
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return (new Wallet())->getTable();
    }

    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create($this->table(), function (Blueprint $table) {
            $table->bigIncrements('id');
//            $table->morphs('holder');
            $table->unsignedInteger('holder_id');
            $table->foreign('holder_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('holder_type')->nullable();
            $table->string('nationality')->nullable();
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('city_town_village')->nullable();
            $table->string('state_pronvince_region')->nullable();
            $table->unsignedInteger('postal_code')->nullable();
            $table->boolean('allow')->default(0);
            $table->string('name')->nullable();
            $table->string('slug')->index()->nullable();
            $table->string('description')->nullable();
            $table->decimal('balance', 64, 0)->default(0);
            $table->timestamps();

//            $table->unique(['holder_type', 'holder_id', 'slug']);
        });

        /**
         * migrate v1 to v2.
         */
        $default = config('wallet.wallet.default.name', 'Default Wallet');
        $slug = config('wallet.wallet.default.slug', 'default');
        $now = time();
        $query = Transaction::query()->distinct()
            ->selectRaw('payable_type as holder_type')
            ->selectRaw('payable_id as holder_id')
            ->selectRaw('? as name', [$default])
            ->selectRaw('? as slug', [$slug])
            ->selectRaw('sum(amount) as balance')
            ->selectRaw('? as created_at', [$now])
            ->selectRaw('? as updated_at', [$now])
            ->groupBy('holder_type', 'holder_id', 'payable_id')
            ->orderBy('holder_type');

        DB::transaction(function () use ($query) {
            $query->chunk(1000, function (Collection $transactions) {
                DB::table((new Wallet())->getTable())
                    ->insert($transactions->toArray());
            });
        });
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::drop($this->table());
    }
}
