<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $incrementing = false;
    
    
    protected $fillable = [
        'id','name','email','phone','api_token','password'
    ];
    protected $primaryKey ="id";
    protected $keyType = 'string';
    

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function courses(){
        return $this->hasMany('App\Course');
    }

    public function classes(){
        return $this->hasMany('App\Classes');
    }

    public function information(){
        return $this->hasMany('App\Informations');
    }
}
