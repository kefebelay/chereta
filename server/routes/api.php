<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanySellerController;
use App\Http\Controllers\DeliveryPersonController;
use App\Http\Controllers\IndividualSellerController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



//                        common routes

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware(['auth:sanctum']);
Route::get('/user', [UserController::class, 'getLoggedinUser'])->middleware( 'auth:sanctum');
Route::delete('/user/{id}', [UserController::class, 'destroy'])->middleware( 'auth:sanctum');
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [PasswordResetLinkController::class, 'update']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/category/{id}', [CategoryController::class, 'show']);
Route::get('/category/{id}/listings', [CategoryController::class, 'getCategoryListings']);
Route::post('/listing/search', [ListingController::class, 'search']);
Route::get('/listings', [ListingController::class, 'index']);
Route::get('/listing/{id}', [ListingController::class, 'show']);
Route::get('/seller/profile/{id}', [UserController::class, 'getSellerProfile']);



//                        Admin routes

Route::post('/admin/register', [AdminController::class, 'store'])->middleware(['auth:sanctum', 'role:admin']);
Route::patch('/admin/{id}',[AdminController::class,'update'])->middleware(['auth:sancturm', 'role:admin']);
Route::get('/admins', [AdminController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);

Route::get('/users', [UserController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/user/{id}', [UserController::class, 'show'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/roles-count', [UserController::class, 'getRolesCount'])->middleware(['auth:sanctum', 'role:admin']);

Route::post('/category',[CategoryController::class,'store'])->middleware(['auth:sanctum', 'role:admin']);
Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->middleware(['auth:sanctum', 'role:admin']);


//modify assign-role
Route::post('/assign-role', [AdminController::class, 'assignRole'])->middleware(['auth:sanctum', 'role:admin']);

Route::get('/buyers', [BuyerController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/delivery_persons', [DeliveryPersonController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/individual_sellers', [IndividualSellerController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/company_sellers', [CompanySellerController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);

//                        Buyer routes

Route::post('/buyer/register', [RegisteredUserController::class, 'store']);
Route::patch('/buyer/{id}', [BuyerController::class, 'update'])->middleware(['auth:sanctum', 'role:buyer']);

//                         seller routes
Route::post('/listing', [ListingController::class, 'store']);

//                        Individual seller routes

Route::post('/individual-seller/register', [IndividualSellerController::class, 'store']);
Route::patch('/individual-seller/{id}', [IndividualSellerController::class, 'update'])->middleware(['auth:sanctum', 'role:individual_seller']);

//                        Company seller routes

Route::post('/company-seller/register', [CompanySellerController::class, 'store']);
Route::patch('/company-seller/{id}', [CompanySellerController::class, 'update'])->middleware(['auth:sanctum', 'role:company_seller']);


//                        Delivery person routes

Route::post('/delivery-person/register', [DeliveryPersonController::class, 'store']);
Route::patch('/delivery-person/{id}', [DeliveryPersonController::class, 'update'])->middleware(['auth:sanctum', 'role:delivery_person']);
