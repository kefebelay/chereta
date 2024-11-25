<?php

namespace App\Http\Controllers;

use App\Models\DeliveryPerson;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class DeliveryPersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $delivery_person = User::role('delivery_person')->get();
            return $delivery_person;
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
        DB::beginTransaction();
        try{
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'phone_number' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'image'=>['required','image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5000'],
            'password' => ['required', Rules\Password::defaults()],
            'address'=>[ 'string', 'max:255'],
            'gender'=>['required','string', 'in:male,female'],
            'age'=>['required', 'numeric', 'between:18,100'],
            'vehicle'=>[ 'string', 'max:20'],
        ]);

        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'image'=>"images/$imageName",
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->string('password')),

        ] );
        DeliveryPerson::create([
            'user_id'=>$user->id,
            'address' => $request->address,
            'age' => $request->age,
            'gender' => $request->gender,
            'vehicle' => $request->vehicle
        ]);

        $user->assignRole('delivery_person');

        DB::commit();
        return response()->json(["user"=>$user, "message"=>"Delivery Personnel account created successfully"]);
        }
        catch(Exception $e){
            return response()->json([
            'message' => $e->getMessage()], 500);
        }
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
                'name' => [ 'string', 'max:255'],
                'username' => [ 'string', 'max:255', 'unique:'.User::class],
                'phone_number' => [ 'string', 'max:255'],
                'vehicle'=>[ 'string', 'max:20'],
                'address'=>[ 'string', 'max:255'],

            ]);

            $user = User::where('id', $id)->update([
                'name' => $request->name,
                'username' => $request->username,
                'phone_number' => $request->phone_number,
            ]);
            DeliveryPerson::where('user_id', $id)->update([
                'address' => $request->address,
                'vehicle' => $request->vehicle
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
