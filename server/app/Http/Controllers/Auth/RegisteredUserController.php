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
            'username' => ['required', 'string', 'max:255', 'unique:' . User::class],
            'phone_number' => ['required', 'string', 'max:15'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5000'],
            'password' => ['required', Rules\Password::defaults()],
            'address' => ['required', 'string', 'max:255'],
            'dob' => ['required', 'date', 'before:'.now()->subYears(18)->format('Y-m-d')], // ensure user is at least 18 years old
            'gender' => ['required', 'string', 'in:male,female'],
        ]);

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $imagePath = "images/$imageName";
        } else {
            $imagePath = "images/profile.svg";
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'image' => $imagePath,
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('buyer');

        Buyer::create([
            'user_id' => $user->id,
            'gender' => $request->gender,
            'dob' => $request->dob,
            'address' => $request->address
        ]);
        DB::commit();

        $token = $user->createToken($request->name);
        sendNotification($user->id, 'Welcome to our chereta', 'Welcome to our chereta, we are glad to have you here, happy bidding!!');

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
