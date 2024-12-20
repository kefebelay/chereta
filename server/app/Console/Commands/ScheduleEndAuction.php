<?php

namespace App\Console\Commands;

use App\Jobs\EndAuctionJob;
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
        EndAuctionJob::dispatch();
        $this->info('Auction end job dispatched successfully.');
    }
}
