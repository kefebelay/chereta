<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Listing;
use Illuminate\Http\Request;

class BidController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'bid_amount' => 'required|numeric|min:1',
            'user_id' => 'required|exists:users,id',
        ]);

        // Fetch the related listing
        $listing = Listing::findOrFail($validated['listing_id']);

        // Check if the auction is still active
        if (now()->greaterThan($listing->bid_end_time)) {
            return response()->json(['error' => 'This auction has ended.'], 403);
        }

        // Ensure the bid is higher than the current highest bid
        if ($validated['bid_amount'] <= $listing->starting_price) {
            return response()->json(['error' => 'Bid amount must be higher than the current price.'], 400);

        }
        if ($validated['bid_amount'] <= $listing->winning_bid_amount) {
            return response()->json(['error' => 'Bid amount must be higher than the current highest bid.'], 400);
        }

        // Save the bid
        $bid = Bid::create($validated);

        // Update the listing's highest bid
        $listing->winning_bid_amount = $bid->bid_amount;
        $listing->save();

        return response()->json(['message' => 'Bid placed successfully!', 'bid' => $bid, 'listing' => $listing->winning_bid_amount], 201);
    }
}
