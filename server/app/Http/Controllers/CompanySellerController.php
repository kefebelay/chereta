<?php

namespace App\Http\Controllers;

use App\Models\CompanySeller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;


class CompanySellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $company_seller = User::where('role', 'company_seller')->get();
            return $company_seller;
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
            'address' => [ 'nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],

        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->string('password')),

        ]);

        CompanySeller::create([
            'user_id'=>$user->id,
            'address' => $request->company_address,
            'description' => $request->company_description
        ]);

        $user->assignRole('company_seller');
        return response()->json(["Admin"=>$user, "message"=>"Company Seller Account created successfully"]);
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
                'phone_number' => ['required', 'string', 'max:15'],
                'address'=>['string', 'max:255'],
                'description' => ['string', 'max:255'],
            ]);

            $user = User::where('id', $id)->update([
                'name' => $request->name,
                'username' => $request->username,
                'phone_number' => $request->phone_number,

            ]);
            CompanySeller::where('user_id', $id)->update([
                'address'=>$request->company_address,
                'description'=>$request->company_description
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
        //
    }
}
