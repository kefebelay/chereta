<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryPerson extends Model
{
    use HasFactory;
    protected $table = 'delivery_persons';
    protected $fillable = [
        'user_id',
        'address',
        'gender',
        'age',
        'vehicle',
    ];
    public function user(){
        return  $this->BelongsTo(User::class);
     }

     public function order()
    {
    return $this->belongsTo(Order::class);
    }
}
