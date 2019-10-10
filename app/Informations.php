<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Informations extends Model
{
    protected $table = 'informations';
    protected $guarded = [];
    protected $primaryKey ="id";
    public $incrementing = false;

    

    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public function category()
    {
        return $this->belongsTo('App\Category','category_id');
    }
    
}
