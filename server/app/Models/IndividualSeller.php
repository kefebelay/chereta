<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndividualSeller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'address',
        'dob',
        'gender',
        'description',
        'is_verified',
    ];
    public function user(){
        return  $this->BelongsTo(User::class);
     }

}
