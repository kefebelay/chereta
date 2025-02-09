<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Listing;
use Illuminate\Http\Request;

class BidController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'bid_amount' => 'required|numeric|min:1',
            'user_id' => 'required|exists:users,id',
        ]);


        $listing = Listing::findOrFail($validated['listing_id']);


        if (now()->greaterThan($listing->bid_end_time)) {
            return response()->json(['error' => 'This auction has ended.'], 403);
        }


        if ($validated['bid_amount'] <= $listing->starting_price) {
            return response()->json(['error' => 'Bid amount must be higher than the current price.'], 400);

        }
        if ($validated['bid_amount'] <= $listing->winning_bid_amount) {
            return response()->json(['error' => 'Bid amount must be higher than the current highest bid.'], 400);
        }


        $bid = Bid::create($validated);


        $listing->winning_bid_amount = $bid->bid_amount;
        $listing->save();
        sendNotification($bid->user_id, 'bid placed!!', "you have plased a bid on {$listing->title} for {$bid->bid_amount} birr");

        return response()->json(['message' => 'Bid placed successfully!', 'bid' => $bid, 'listing' => $listing->winning_bid_amount], 201);
    }
    public function showListingBids(string $id){
        $bid = Bid::where('listing_id', $id)->with('user')->orderBy('created_at', 'desc')->get();
        return response()->json(["bid" => $bid]);
    }
    public function showUserBids(string $id){
        $bids = Bid::where('user_id', $id)->with('listing')->get();
        return response()->json(["bids" => $bids]);
    }

}
