<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Listing;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function addFavorite(Request $request, $id)
    {
        $user = $request->user();

        if (Favorite::where('user_id', $user->id)->where('listing_id', $id)->exists()) {
            return response()->json(['message' => 'Already favorited'], 400);
        }

        Favorite::create([
            'user_id' => $user->id,
            'listing_id' => $id,
        ]);

        return response()->json(['message' => 'Listing added to favorites'], 201);
    }

    public function removeFavorite(Request $request, $id)
    {
        $user = $request->user();

        $favorite = Favorite::where('user_id', $user->id)->where('listing_id', $id)->first();

        if (!$favorite) {
            return response()->json(['message' => 'Not in favorites'], 400);
        }

        $favorite->delete();

        return response()->json(['message' => 'Listing removed from favorites'], 200);
    }

    public function getFavorites(Request $request)
    {
        $user = $request->user();
        $favorites = Favorite::where('user_id', $user->id)->with('listing')->get();

        return response()->json([
            'message' => 'Favorite listings retrieved successfully',
            'data' => $favorites
        ], 200);
    }

    public function isFavorite(Request $request, $id)
    {
        $user = $request->user();
        $isFavorite = Favorite::where('user_id', $user->id)->where('listing_id', $id)->exists();

        return response()->json(['isFavorite' => $isFavorite], 200);
    }
}
