<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Buyer;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        DB::beginTransaction();

        try{
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'phone_number' => ['required', 'string', 'max:15'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', Rules\Password::defaults()],
            'gender' =>['required', 'string', 'max:6'],
            'age'=>['required', 'integer','min:18', 'max:100', ],
            'address'=>['required', 'string', 'max:255']
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->string('password')),

        ]);

        $user->assignRole('buyer');
        $buyer = new Buyer([
            'gender' => $request->gender,
            'age' => $request->age,
            'address' =>$request->address
        ]);

        $buyer->user_id = $user->id;
        $buyer->save();

        DB::commit();

        $token = $user->createToken($request->name);

        return response()->json([
        "message" => "Registered Successfully",
         'access_token' => $token->plainTextToken,
          'user' => $user], 200);
    }
    catch(Exception $e)
    {
        return response()->json(array(

        'message' => $e->getMessage()), 500);
    }

    }
}
