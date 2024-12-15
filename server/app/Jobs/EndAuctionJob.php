<?php

namespace App\Jobs;

use App\Models\Bid;
use App\Models\Listing;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class EndAuctionJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $activeListings = Listing::where('status', 'active')->get();

        foreach ($activeListings as $listing) {

            $listing->endAuction();
        }
    }
}
