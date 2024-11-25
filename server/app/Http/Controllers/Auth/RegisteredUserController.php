<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Buyer;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
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
            'image'=>['required','image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5000'],
            'password' => ['required', Rules\Password::defaults()],
            'address' => ['required', 'string', 'max:255'],
            'age'=>['required', 'numeric', 'between:18,100'],
            'gender'=>['required','string', 'in:male,female'],
        ]);
        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'image' => "images/$imageName",
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->string('password')),

        ]);

        $user->assignRole('buyer');

        Buyer::create([
            'user_id' => $user->id,
            'gender' => $request->gender,
            'age' => $request->age,
            'address' =>$request->address
        ]);

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
