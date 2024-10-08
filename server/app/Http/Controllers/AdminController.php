<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;


class AdminController extends Controller
{
    public function assignRole(Request $request)
    {
        try {
            $request->validate([
                'role' => 'required|string|exists:roles,name',
            ]);
            $user = Auth::user();

            if ($user instanceof \App\Models\User) {
                $user->syncRoles($request->role);
                return response()->json(['message' => 'Role assigned successfully', 'role' => $request->role], 200);
            } else {
                return response()->json(['message' => 'An error occurred'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $admin = User::where('role', 'admin')->get();
        return $admin;

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
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->string('password')),

        ] );

        $user->assignRole('admin');
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
            ]);

            $user = User::where('id', $id)->update([
                'name' => $request->name,
                'username' => $request->username,
                'phone_number' => $request->phone_number,
                'password' => Hash::make($request->string('password')),
            ]);
            return response()->json([
            "message" => "Updated Successfully",
              'user' => $user], 200);
        }
        catch(Exception $e)
        {
            return response()->json([
            'message' => $e->getMessage()], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //Already done in users controller
    }
}
