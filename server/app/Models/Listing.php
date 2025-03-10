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
        'quantity',
        'is_private',
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

    public function favorite()
    {
        return $this->hasMany(Favorite::class);
    }

    public function comment()
   {
    return $this->hasMany(Comment::class);
   }
    public function order()
    {
        return $this->hasMany(Order::class);
    }
    public function listingreport()
    {
        return $this->hasMany(ListingReport::class);
    }

    public function winner()
    {
        return $this->belongsTo(User::class, 'winner_id');
    }

    public function endAuction()
    {
        $highestBid = $this->bids()->orderBy('bid_amount', 'desc')->first();

        if ($highestBid) {
            $this->winner_id = $highestBid->user_id;
            $this->winning_bid_amount = $highestBid->bid_amount;
        }

        $this->status = 'ended';
        $this->save();
    }
}
