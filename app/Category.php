<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $incrementing = false;
    protected $table = 'categories';
    protected $guarded = [];
    protected $primaryKey ="id";
    protected $keyType = 'string';
    


    public function informations(){
        return $this->hasMany('App\Informations');
    }

    
}
