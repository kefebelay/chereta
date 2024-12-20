<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bid;
use Illuminate\Http\Request;

class Bidcontroller extends Controller
{
//
public function index(Request $request) {
    $bids = Bid::query();

    if ($request->has('category')) {
        $bids->where('category_id', $request->category);
    }
    if ($request->has('status')) {
        $bids->whereIn('status', $request->status);
    }
    if ($request->has('favorite') && $request->favorite) {
        $bids->whereHas('favorite');
    }

    return response()->json($bids->get());
}
}
