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

    // Automatically load roles relationship
    protected $with = ['roles'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'username',
    ];

    // Add "actor" to JSON output
    protected $appends = ['actor'];

    // Hide sensitive fields
    protected $hidden = [
        'password',
        'remember_token',
        'admin',
        'buyer',
        'individual_seller',
        'company_seller',
        'delivery_person'

    ];

    // Cast fields
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

    // Accessor to get the "actor" based on role
    public function getActorAttribute()
    {
        if ($this->hasRole('buyer')) {
            return $this->buyer;
        } elseif ($this->hasRole('admin')) {
            return $this->admin;
        } elseif ($this->hasRole('individual_seller')) {
            return $this->individualSeller;
        } elseif ($this->hasRole('company_seller')) {
            return $this->companySeller;
        } elseif ($this->hasRole('delivery_person')) {
            return $this->deliveryPerson;
        }

        return null;
    }
}
