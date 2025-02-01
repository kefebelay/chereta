<?php

namespace App\Http\Controllers;

use App\Models\IndividualSeller;
use App\Models\User;
use App\Models\Listing;
use App\Models\Bid;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            $individualseller = User::where('role', 'individual_seller')->get();
            return $individualseller;
        }
        catch(Exception $e)
        {
            return response()->json([
            'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'phone_number' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'image'=>['nullable','image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5000'],
            'password' => ['required', Rules\Password::defaults()],
            'address'=>['nullable','string', 'max:255'],
            'age'=>['required', 'numeric', 'between:18,100'],
            'gender'=>['required','string', 'in:male,female'],
            'description' => [ 'nullable','string', 'max:255'],
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
        IndividualSeller::create([
            'user_id'=>$user->id,
            'address' => $request->address,
            'age' => $request->age,
            'gender' => $request->gender,
            'description' => $request->description
        ]);

        $user->assignRole('individual_seller');
        $user = $user->load('individualSeller');
        DB::commit();
        return response()->json(["user"=>$user, "message"=>"Seller Account created successfully"]);
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
                'address' => ['string', 'max:255'],
            ]);

            $user = User::where('id', $id)->update([
                'name' => $request->name,
                'username' => $request->username,
                'phone_number' => $request->phone_number,
                'password' => Hash::make($request->string('password')),
            ]);
            IndividualSeller::where('user_id', $id)->update([
                'address' => $request->address,
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

    public function getListingCounts($id)
    {
        try {
            $totalListings = Listing::where('user_id', $id)->count();
            $liveListings = Listing::where('user_id', $id)->whereNull('winner_id')->count();
            $soldListings = Listing::where('user_id', $id)->whereNotNull('winner_id')->count();
            $totalBids = Bid::whereIn('listing_id', Listing::where('user_id', $id)->pluck('id'))->count();
            $uniqueBidders = Bid::whereIn('listing_id', Listing::where('user_id', $id)->pluck('id'))->distinct('user_id')->count('user_id');

            return response()->json([
                'total_listings' => $totalListings,
                'live_listings' => $liveListings,
                'sold_listings' => $soldListings,
                'total_bids' => $totalBids,
                'unique_bidders' => $uniqueBidders
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
