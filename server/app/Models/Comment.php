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
        'comment',
        'parent_id',
        'listing_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function listing(){
        return $this->belongsTo(Listing::class);
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}
