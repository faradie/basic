<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    
    protected $table = 'categories';
    protected $guarded = [];
    protected $primaryKey ="id";
    public $incrementing = false;


    public function informations(){
        return $this->hasMany('App\Informations');
    }

    
}
