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
    ];

    // Define relationships
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

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'buyer', 'individual_Seller',
        'company_Seller', 'admin', 'delivery_Person'
    ];


    public function getActorAttribute()
    {
        if ($this->hasRole('buyer')) {
            return $this->buyer;
        } elseif ($this->hasRole('admin')) {
            return $this->admin;
        } elseif ($this->hasRole('individual_seller')) {
            return $this->individualSeller;
        } elseif ($this->hasRole('compan_seller')) {
            return $this->companySeller;
        } elseif ($this->hasRole('delivery_person')) {
            return $this->deliveryPerson;
        }

        return null;
    }
}
