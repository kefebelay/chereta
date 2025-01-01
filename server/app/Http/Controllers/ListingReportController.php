<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\ListingReport;
use Illuminate\Http\Request;

class ListingReportController extends Controller{


    public function report(Request $request, $listingId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'seller_id' => 'required|exists:users,id',
            'reason' => 'required|string|max:255',
            'custom_reason' => 'nullable|string|max:500',
        ]);

        $report = ListingReport::create([
            'listing_id' => $listingId,
            'user_id' => $request->user_id,
            'seller_id' => $request->seller_id,
            'reason' => $request->reason,
            'custom_reason' => $request->custom_reason,
        ]);

        return response()->json(['message' => 'Report submitted successfully', 'report' => $report], 201);
    }

    public function index()
    {
        $reports = ListingReport::with('listing', 'user', 'seller')->get();

        return response()->json(['reports' => $reports], 200);
    }

    public function deleteListing($listingId)
    {
        $listing = Listing::findOrFail($listingId);
        $listing->delete();

        return response()->json(['message' => 'Listing deleted successfully'], 200);
    }
}
