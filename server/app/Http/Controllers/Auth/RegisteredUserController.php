<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        try{
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->string('password')),
        ]);

        $user->assignRole('buyer');

        event(new Registered($user));

        $token = $user->createToken($request->name);

        return response()->json([
        "message" => "Registration Successfully",
         'access_token' => $token->plainTextToken,
          'user' => $user], 200);
    }
    catch(Exception $e)
    {
        return response()->json(array(
        'error' => 'something went wrong',
        'error_message' => $e->getMessage()), 500);
    }

    }
}
