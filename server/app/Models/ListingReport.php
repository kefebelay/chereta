<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListingReport extends Model
{


    protected $table = 'listing_reports';


    protected $fillable = [
        'listing_id',
        'user_id',
        'reason',
        'custom_reason',
    ];

    // Relationships

    /**
     * The listing that this report belongs to.
     */
    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    /**
     * The user who created this report.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public static function reasons()
    {
        return [
            'Inappropriate',
            'Fake',
            'Spam',
            'Other',
        ];
    }
}
