<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    protected $with = ['roles'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'username',
        'image'
    ];

    protected $appends = ['actor'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relationships
    public function buyer()
    {
        return $this->hasOne(Buyer::class);
    }

    public function individualSeller()
    {
        return $this->hasOne(IndividualSeller::class);
    }

    public function companySeller()
    {
        return $this->hasOne(CompanySeller::class);
    }

    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    public function deliveryPerson()
    {
        return $this->hasOne(DeliveryPerson::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function listings()
    {
        return $this->hasMany(Listing::class);
    }

    public function favorites()
   {
    return $this->belongsToMany(Listing::class, 'favorites','user_id','listing_id');
   }

   public function order()
   {
    return $this->hasMany(Order::class);
   }

   public function comment()
   {
    return $this->hasMany(Comment::class);
   }




    // Accessor to get the "actor" dynamically
    public function getActorAttribute()
    {
        $roleRelationships = [
            'buyer' => 'buyer',
            'admin' => 'admin',
            'individual_seller' => 'individualSeller',
            'company_seller' => 'companySeller',
            'delivery_person' => 'deliveryPerson',
        ];

        foreach ($roleRelationships as $role => $relationship) {
            if ($this->hasRole($role)) {
                return $this->$relationship;
            }
        }

        return null;
    }


}
