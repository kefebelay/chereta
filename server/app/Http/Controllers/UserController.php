<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Buyer;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getRolesCount(){
        try {
            $buyers = User::role('buyer')->count();
            $individual_sellers = User::role('individual_seller')->count();
            $company_sellers = User::role('company_seller')->count();
            $delivery_persons = User::role('delivery_person')->count();
            $admins = User::role('admin')->count();
            $users = User::all()->count();

            return response()->json([
                'buyers' => $buyers,
                'individual_sellers' => $individual_sellers,
                'company_sellers' => $company_sellers,
                'delivery_persons' => $delivery_persons,
                'admins' => $admins,
                'users' => $users
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function getLoggedinUser(Request $request)
{
    $user = $request->user();

    // Dynamically load the actor-specific relationship based on the user's role
    if ($user->hasRole('buyer')) {
        $user->load('buyer');
    } elseif ($user->hasRole('admin')) {
        $user->load('admin');
    } elseif ($user->hasRole('individual_seller')) {
        $user->load('individualSeller');
    } elseif ($user->hasRole('company_seller')) {
        $user->load('companySeller');
    } elseif ($user->hasRole('delivery_person')) {
        $user->load('deliveryPerson');
    }

    return response()->json(["user" => $user], 200);
}






    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //done for eact actors in their controller
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $user = User::where('id', $id)->get();
            return [$user, 200];
        }
        catch(Exception $e)
        {
            return response()->json([
            'error_message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //implemented in each actors controller
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::where('id',$id)->delete();
        return response()->json(['message'=>'user deleted successfully'], 200);
    }


}
