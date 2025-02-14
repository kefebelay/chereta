<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable = [
        'full_name',
        'additional_info',
        'street',
        'city',
        'phone',
        'buyer_id',
        'listing_id',
        'delivery_person_id',
        'status',
        'is_arrived',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    public function isPending()
    {
        return $this->status === 'Pending';
    }

    public function deliverypersonnel()
   {
    return $this->belongsTo(DeliveryPerson::class);
   }


}
