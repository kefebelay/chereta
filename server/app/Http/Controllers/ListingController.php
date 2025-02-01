<?php
namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getSellerListings(String $id) {
        try {

            $listings = Listing::with('category', 'user')
            ->where('user_id', $id)->get();
            return response()->json($listings);
        }
        catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function search(Request $request) {
        try {
            $query = $request->input('query');
            $category = $request->input('category');
            $sort = $request->input('sort', 'asc'); // default to ascending

            Log::info("Search query: $query, Category: $category, Sort: $sort");

            $listings = Listing::where(function($q) use ($query) {
                    $q->where('title', 'LIKE', '%' . $query . '%')
                      ->orWhere('description', 'LIKE', '%' . $query . '%');
                })
                ->when($category, function($q) use ($category) {
                    $q->where('category_id', $category);
                })
                ->with('category', 'user')
                ->orderBy('starting_price', $sort)
                ->take(5)
                ->get();

            Log::info("Listings found: " . $listings->count());
            return response()->json($listings);
        }
        catch (\Exception $e) {
            Log::error("Error in search: " . $e->getMessage());
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $listings = Listing::with('category', 'user')->get();
            return response()->json($listings);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'category_id' => ['required', 'exists:categories,id'],
                'user_id' => ['required', 'exists:users,id'],
                'title' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
                'starting_price' => ['required', 'numeric', 'min:0'],
                'bid_start_time' => ['required', 'date', 'before_or_equal:' . now()->addMonths(6)],
                'bid_end_time' => ['required', 'date', 'after_or_equal:' . $request->input('bid_start_time')],
                'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5000'],
            ]);


            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images/listings'), $imageName);

            $listing = Listing::create([
                'category_id' => $request->category_id,
                'user_id' => $request->user_id,
                'title' => $request->title,
                'description' => $request->description,
                'starting_price' => $request->starting_price,
                'bid_end_time' => $request->bid_end_time,
                'bid_start_time' => $request->bid_start_time,
                'image' => "images/listings/$imageName",
            ]);

            return response()->json(["message" => "Listing Created Successfully", "listing" => $listing]);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    try {
        $listing = Listing::with('category', 'user')->where('id', $id)->firstOrFail();
        return response()->json($listing);
    } catch (\Exception $e) {
        return response()->json(["message" => "Listing not found"], 404);
    }
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $listing = Listing::findOrFail($id);

            $request->validate([

                'title' => ['sometimes', 'string', 'max:255'],
                'description' => ['sometimes', 'string'],
                'starting_price' => ['sometimes', 'numeric', 'min:0'],
                'bid_end_time' => ['sometimes', 'date', 'after:now'],
                'image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5000'],
            ]);

            if ($request->hasFile('image')) {

                if (file_exists(public_path($listing->image))) {
                    unlink(public_path($listing->image));
                }

                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images/listings'), $imageName);
                $listing->image = "images/listings/$imageName";
            }


            if ($request->has('category_id')) $listing->category_id = $request->category_id;
            if ($request->has('title')) $listing->title = $request->title;
            if ($request->has('description')) $listing->description = $request->description;
            if ($request->has('starting_price')) $listing->starting_price = $request->starting_price;
            if ($request->has('bid_end_time')) $listing->bid_end_time = $request->bid_end_time;

            $listing->save();

            return response()->json(["message" => "Listing Updated Successfully", "listing" => $listing]);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $listing = Listing::findOrFail($id);

            if (file_exists(public_path($listing->image))) {
                unlink(public_path($listing->image));
            }

            $listing->delete();

            return response()->json(["message" => "Listing Deleted Successfully"]);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function endAuction(string $id)
    {
        try {
            $listing = Listing::with('bids')->findOrFail($id);

            // Log the current time and bid_end_time for debugging
            Log::info("Checking auction end for listing ID: $id", [
                'current_time' => now(),
                'bid_end_time' => $listing->bid_end_time,
            ]);

            if ($listing->bid_end_time > now()) {
                Log::info("Auction has not ended yet for listing ID: $id", [
                    'current_time' => now(),
                    'bid_end_time' => $listing->bid_end_time,
                ]);
                return; // Do not change the status if the auction has not ended
            }

            $highestBid = $listing->bids()->orderBy('amount', 'desc')->first();

            if ($highestBid) {
                $listing->winner_id = $highestBid->user_id;
                Log::info("Highest bid found for listing ID: $id", [
                    'highest_bid' => $highestBid->amount,
                    'winner_id' => $highestBid->user_id,
                ]);
            } else {
                Log::info("No bids found for listing ID: $id");
            }

            $listing->status = 'ended';
            $listing->save();

            Log::info("Auction ended successfully for listing ID: $id");

        } catch (\Exception $e) {
            Log::error("Error ending auction for listing ID: $id", ['error' => $e->getMessage()]);
        }
    }

    public function getListingStatistics()
    {
        try {
            $totalListings = Listing::count();
            $activeListings = Listing::where('status', 'active')->count();
            $endedListings = Listing::where('status', 'ended')->count();
            $listingsWithWinner = Listing::whereNotNull('winner_id')->count();

            return response()->json([
                'totalListings' => $totalListings,
                'activeListings' => $activeListings,
                'endedListings' => $endedListings,
                'listingsWithWinner' => $listingsWithWinner,
            ]);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
}
