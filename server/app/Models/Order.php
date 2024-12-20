<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable = [
        'order_number',
        'quantity',
        'buyer_id',
        'listing_id',
        'delivery_person_id',
        'delivery_date',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    public function isPending()
    {
        return $this->status === 'Pending';
    }

    public function delivery()
   {
    return $this->belongsTo(DeliveryPerson::class);
   }


}
