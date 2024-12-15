<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'user_id',
        'winner_id',
        'title',
        'description',
        'starting_price',
        'bid_end_time',
        'bid_start_time',
        'winning_bid_amount',
        'status',
        'image',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function bids(){
        return $this->hasMany(Bid::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function endAuction()
    {

        if (now()->greaterThanOrEqualTo($this->bid_end_time) && $this->status !== 'ended') {

            $highestBid = $this->bids()->orderBy('bid_amount', 'desc')->first();

            if ($highestBid) {

                $this->winner_id = $highestBid->user_id;
            }


            $this->status = 'ended';
            $this->save();
        }
    }
}
