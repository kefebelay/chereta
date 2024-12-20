<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;use HasFactory;

    protected $fillable = [
        'user_id',
        'listing_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function listing(){
        return $this->belongsTo(Listing::class);
    }
}
