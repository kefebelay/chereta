<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryPerson extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];
    public function user(){
        return  $this->BelongsTo(User::class);
     }
}
