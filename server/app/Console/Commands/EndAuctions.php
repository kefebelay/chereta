<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Listing;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class EndAuctions extends Command
{
    protected $signature = 'auctions:end';
    protected $description = 'End auctions that have reached their end time';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $listings = Listing::where('bid_end_time', '<=', Carbon::now())
            ->where('status', '!=', 'ended')
            ->get();

        Log::info("Found " . $listings->count() . " listings to check for auction end.");

        foreach ($listings as $listing) {
            Log::info("Processing listing ID: " . $listing->id);
            $listing->endAuction();
        }

        $this->info('Auctions ended successfully.');
    }
}
