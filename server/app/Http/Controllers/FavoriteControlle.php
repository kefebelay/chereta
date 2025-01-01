<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Listing;
use Illuminate\Http\Request;

class FavoriteControlle extends Controller
{
    public function addFavorite(Request $request, Listing $listing)
    {
        $user = $request->user();

        if ($user->favorites()->where('listing_id', $listing->id)->exists()) {
            return response()->json(['message' => 'Already favorited'], 400);
        }

        $user->favorites()->attach($listing->id);

        return response()->json(['message' => 'Listing added to favorites'], 201);
    }

    /**
     * Display the user's favorite listings
     */
    public function getFavorites(Request $request)
    {
        $user = $request->user();


        $favorites = $user->favorites()->get();

        return response()->json([
            'message' => 'Favorite listings retrieved successfully',
            'data' => $favorites
        ], 200);
    }
}

