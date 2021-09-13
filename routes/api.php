<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CybersourceController;
use App\Http\Controllers\Api\UserAPIController;
use App\Http\Controllers\AuthController;

Route::post('payment', [CybersourceController::class, 'cybersource_api']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify', [AuthController::class, 'verify']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::fallback(function () {
        return response()->json([
            'success' => false,
            'message' => 'Page Not Found. If error persists, contact aksam@gmail.com',
        ], 404);
    });
});



// START
// THE APIS FOR HANDLING CRUD OPERATIONS ON THE USE ENTITY

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
