<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', function (){

     User::create([
        'name' => "hi",
        'email' => "email",
        'password' => Hash::make("password"),
        'username' => "username",
        'phone_number' => "phone_number"
    ]);


})->name('api.register');
