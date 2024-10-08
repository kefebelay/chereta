<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;


class BuyerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $user = User::where('role', 'buyer')->get();
            return $user;
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
        //Already done in Auth/Registered user controller
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //implemented in the user controller
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
                'address' => ['required', 'string', 'max:255']
            ]);

            $user = User::where('id', $id)->update([
                'name' => $request->name,
                'username' => $request->username,
                'phone_number' => $request->phone_number,
                'password' => Hash::make($request->string('password')),
                'address' => $request->address,
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
        //Already done in user controller
    }
}
