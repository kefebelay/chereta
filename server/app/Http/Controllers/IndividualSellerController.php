<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class IndividualSellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $individualseller = User::where('role', 'delivery_person')->get();
            return $individualseller;
        }
        catch(Exception $e)
        {
            return response()->json([
            'error_message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', Rules\Password::defaults()],
            'address'=>['required', 'string', 'max:255'],
            'age'=>['required', 'string', 'max:3'],
            'gender'=>['required','string', 'max:6'],
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->string('password')),
            'address' => $request->address,
            'age' => $request->age,
            'gender' => $request->gender

        ] );

        $user->assignRole('individual_seller');
        return response()->json(["Admin"=>$user, "message"=>"Admin created successfully"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'username' => ['required', 'string', 'max:255'],
                'phone_number' => ['required', 'string', 'max:255'],
                'password' => ['required', Rules\Password::defaults()],
                'address' => ['required', 'string', 'max:255'],
            ]);

            $user = User::where('id', $id)->update([
                'name' => $request->name,
                'username' => $request->username,
                'phone_number' => $request->phone_number,
                'password' => Hash::make($request->string('password')),
                'address' => $request->address
            ]);
            return response()->json([
            "message" => "Updated Successfully",
              'user' => $user], 200);
        }
        catch(Exception $e)
        {
            return response()->json([
            'error_message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
