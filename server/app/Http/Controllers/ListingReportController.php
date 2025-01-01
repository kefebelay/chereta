<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\ListingReport;
use Illuminate\Http\Request;

class ListingReportController extends Controller{


    public function report(Request $request, $listingId)
    {
        $request->validate([
            'reason' => 'required|string|max:255',
            'custom_reason' => 'nullable|string|max:500',
        ]);

        $report = ListingReport::create([
            'listing_id' => $listingId,
            'user_id' => \Illuminate\Support\Facades\Auth::user()->id,
            'reason' => $request->reason,
            'custom_reason' => $request->custom_reason,
        ]);

        return response()->json(['message' => 'Report submitted successfully', 'report' => $report], 201);
    }


    public function index()
    {

        $reports = ListingReport::with('listing', 'user')->get();

        return view('admin.reports.index', compact('reports'));
    }


    public function deleteListing($listingId)
    {
        $listing = Listing::findOrFail($listingId);
        $listing->delete();

        return response()->json(['message' => 'Listing deleted successfully'], 200);
    }
}
