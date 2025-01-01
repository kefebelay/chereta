<?php

namespace App\Console\Commands;

use App\Jobs\EndAuctionJob;
use App\Models\Listing;
use Illuminate\Console\Command;

class ScheduleEndAuction extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:schedule-end-auction';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'End auctions and determine the winner';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $activeListings = Listing::where('status', 'active')->where('bid_end_time', '<=', now())->get();

        foreach ($activeListings as $listing) {
            $listing->endAuction();
        }

        $this->info('Auctions ended successfully.');
    }
}
