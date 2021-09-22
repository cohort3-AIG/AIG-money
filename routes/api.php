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
});


Route::get("charge",[TransactionController::class, 'get_charge']);
// START THE APIS FOR HANDLING CRUD OPERATIONS ON THE USE ENTITY

// #Users api Route for the get method to display users values from the db
Route::get("user/list", [UserAPIController::class, "index"]);

// #Users api Route for the post method to 'create / add / store' values to the db
Route::post("user/create", [UserAPIController::class, "store"]);

// #Users api Route for the show method to display users of specific id
Route::get("user/{id}", [UserAPIController::class, "show"]);

// #Users api Route for the put method to update user instance in the db
Route::put("user/{id}", [UserAPIController::class, "update"]);

// #Users api Route for the delete method to delete a user instance in the db
Route::delete("user/{id}", [UserAPIController::class, "destroy"]);

// SEARCH about users
Route::get("user/search/{name}", [UserAPIController::class, "where"]);

// END API ROUTES FOR THE USER ENTITY



/** #start WALLET TO WALLET WORKFLOW... */

// Add some sample funds to 'logged in' user
Route::post("wallet/me/add/", [WalletToWalletController::class, "addToAuthWallet"]);
// Add some sample funds to 'specific' user
Route::post("wallet/user/add/", [WalletToWalletController::class, "addToSomeWallet"]);   // WORKs !

// view wallet balance of auth user
Route::get("wallet/me/balance/", [WalletToWalletController::class, "walletBalanceOfAuthenticatedUser"]);   // WORKs !
// view wallet balance of specific user
Route::get("wallet/user/balance/", [WalletToWalletController::class, "walletBalanceOfSpecificUser"]);   // WORKs !

// transfer from 'wallet to wallet'
Route::post("wallet/transfer/", [WalletToWalletController::class, "transferWalletToWallet"]);

// LOGS of the 'transactions'
Route::get("transactions/logs/", [LogAPIController::class, "index"]);   // Works

/** #end WALLET TO WALLET WORKFLOW... */


