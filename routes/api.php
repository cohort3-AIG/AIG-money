<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CybersourceController;
use App\Http\Controllers\Api\UserAPIController;
use App\Http\Controllers\Api\LogAPIController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\Api\WalletToWalletController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\BeneficiaryAPIController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify_phone', [AuthController::class, 'verify_phone']);
Route::post('/phone', [AuthController::class, 'phone']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/wallet_create', [WalletController::class, 'create']);
    Route::get('/wallet_get', [WalletController::class, 'get_wallet_data']);

    Route::post('payment', [CybersourceController::class, 'cybersource_api']);

    Route::fallback(function () {
        return response()->json([
            'success' => false,
            'message' => 'Page Not Found. If error persists, contact aksam@gmail.com',
        ], 404);
    });

    Route::get("charge", [TransactionController::class, 'get_charge']);

    // User
    Route::get("user/list", [UserAPIController::class, "index"]);
    Route::post("user/create", [UserAPIController::class, "store"]);
    Route::get("user/{id}", [UserAPIController::class, "show"]);
    Route::put("user/{id}", [UserAPIController::class, "update"]);
    Route::delete("user/{id}", [UserAPIController::class, "destroy"]);
    Route::get("user/search/{name}", [UserAPIController::class, "where"]);

    // start WALLET TO WALLET WORKFLOW
    Route::post("wallet/me/add/", [WalletToWalletController::class, "addToAuthWallet"]);
    Route::post("wallet/user/add/", [WalletToWalletController::class, "addToSomeWallet"]);   // WORKs !
    Route::get("wallet/me/balance/", [WalletToWalletController::class, "walletBalanceOfAuthenticatedUser"]);
    Route::get("wallet/user/balance/", [WalletToWalletController::class, "walletBalanceOfSpecificUser"]);
    Route::post("wallet/transfer/", [WalletToWalletController::class, "transferWalletToWallet"]);
    Route::get("transactions/logs/all/", [LogAPIController::class, "index"]);   // Works
    Route::get("transactions/logs/me/", [LogAPIController::class, "myTransactions"]);   // Works

    // Beneficiary
    Route::get("beneficiary/list", [BeneficiaryAPIController::class, "index"]);
    Route::post("beneficiary/create", [BeneficiaryAPIController::class, "store"]);
    Route::get("beneficiary/{id}", [BeneficiaryAPIController::class, "show"]);
    Route::put("beneficiary/{id}", [BeneficiaryAPIController::class, "update"]);
    Route::delete("beneficiary/{id}", [BeneficiaryAPIController::class, "destroy"]);
    Route::get("beneficiary/search/{name}", [BeneficiaryAPIController::class, "where"]);
    Route::get("beneficiary/{id}/edit", [BeneficiaryAPIController::class, "edit"]);
    Route::get("beneficiary/search/{name}", [BeneficiaryAPIController::class, "where"]);
});
