<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'status',
    ];

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
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function scopeIsAdmin($query)
    {
        return $query->where('role_id', config('custom.user_roles.admin'));
    }

    public function scopeIsWriter($query)
    {
        return $query->where('role_id', config('custom.user_roles.writer'));
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function getStatusAttribute($value)
    {
        $userStatus = null;
        switch ($value) {
            case config('custom.user_status.active'):
                $userStatus = __('active');
                break;
            case config('custom.user_status.block'):
                $userStatus = __('block');
                break;
            default:
                $userStatus = __('active');
                break;
        }

        return $userStatus;
    }

    public function getUnreadNotificationAttribute()
    {
        return $this->Notifications->whereNull('read_at')->count();
    }
}
