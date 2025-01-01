<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ListingReportController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CompanySellerController;
use App\Http\Controllers\DeliveryPersonController;
use App\Http\Controllers\FavoriteControlle;
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

Route::post('/listing/{id}/favorites', [FavoriteControlle::class, 'addFavorite'])->middleware( 'auth:sanctum');
Route::get('/favorites', [FavoriteControlle::class, 'getFavorites'])->middleware( 'auth:sanctum','role:buyer');


Route::post('/bid',[BidController::class,'index']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/comments', [CommentController::class, 'index']);
    Route::post('/comments', [CommentController::class, 'store']);
    Route::get('/comments/{id}', [CommentController::class, 'show']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::put('orders/{id}', [OrderController::class, 'update']);
    Route::delete('orders/{id}', [OrderController::class, 'destroy']);
});


Route::post('/listing/{listing}/report', [ListingReportController::class, 'report']);


Route::get('/listings/reports', [ListingReportController::class, 'index']);
Route::delete('/listings/{listing}', [ListingReportController::class, 'deleteListing']);

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
Route::post('/bid', [BidController::class, 'store']);
Route::get('/listing/bids/{id}', [BidController::class, 'showListingBids']);
Route::get('/my-bids/{id}', [BidController::class, 'showUserBids']);
//                         seller routes
Route::post('/listing', [ListingController::class, 'store']);
Route::get('/my-listings/{id}', [ListingController::class, 'getSellerListings'])->middleware(['auth:sanctum', 'role:individual_seller|company_seller']);

//                        Individual seller routes

Route::post('/individual-seller/register', [IndividualSellerController::class, 'store']);
Route::patch('/individual-seller/{id}', [IndividualSellerController::class, 'update'])->middleware(['auth:sanctum', 'role:individual_seller']);

//                        Company seller routes

Route::post('/company-seller/register', [CompanySellerController::class, 'store']);
Route::patch('/company-seller/{id}', [CompanySellerController::class, 'update'])->middleware(['auth:sanctum', 'role:company_seller']);


//                        Delivery person routes

Route::post('/delivery-person/register', [DeliveryPersonController::class, 'store']);
Route::patch('/delivery-person/{id}', [DeliveryPersonController::class, 'update'])->middleware(['auth:sanctum', 'role:delivery_person']);
