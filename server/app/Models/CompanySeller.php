<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanySeller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'description',
        'address',

    ];

    public function user(){
       return  $this->BelongsTo(User::class);
    }

}
