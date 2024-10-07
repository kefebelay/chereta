<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
