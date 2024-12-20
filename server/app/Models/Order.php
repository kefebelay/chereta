<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable = [
        'order_number',
        'item',
        'quantity',
        'delivery_date',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isPending()
    {
        return $this->status === 'Pending';
    }

    public function delivery()
   {
    return $this->hasOne(DeliveryPerson::class);
   }

   
}
