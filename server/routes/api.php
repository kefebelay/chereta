<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



//                        General routes

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware(['auth:sanctum']);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



//                        Admin routes

Route::post('/assign-role', [AdminController::class, 'assignRole'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/users', [AdminController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::post('/create-admin', [AdminController::class, 'store'])->middleware(['auth:sanctum', 'role:admin']);


//                        Buyer routes
Route::post('/register-buyer', [RegisteredUserController::class, 'store']);

//                        Individual seller routes


//                        Company seller routes




//                        Delivery person routes
