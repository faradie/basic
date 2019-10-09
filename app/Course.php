<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $guarded = [];
    protected $primaryKey ="id";
    public $incrementing = false;
    public function classes(){
        return $this->hasMany('App\Classes');
    }
    public function lectur(){
        return $this->hasMany('App\User');
    }
}
