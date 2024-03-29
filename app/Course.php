<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $guarded = [];
    protected $primaryKey ="id";
    public $incrementing = false;
    protected $keyType = 'string';
    
    public function classes(){
        return $this->hasMany('App\Classes');
    }
    public function lectur(){
        return $this->hasMany('App\User');
    }

    public function modules(){
        return $this->hasMany('App\Module');
    }
}
