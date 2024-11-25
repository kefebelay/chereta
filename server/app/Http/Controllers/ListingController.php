<?php
namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function search(Request $request) {
        try {
            $query = $request->input('query');
            $listings = Listing::where('title', 'LIKE', '%' + $query + '%')
                ->orWhere('description', 'LikE', '%' + $query + '%')
                ->with('category', 'user')
                ->take(5)->get();
            return response()->json($listings);
        }
        catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $listings = Listing::with('category', 'user')->paginate(10);
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
                'bid_end_time' => ['required', 'date', 'after:now'],
                'image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5000'],
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
            $listing = Listing::with('category', 'user', 'bids.user')->findOrFail($id);
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
                'category_id' => ['sometimes', 'exists:categories,id'],
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
}
