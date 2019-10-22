<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Informations extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $incrementing = false;
    protected $table = 'informations';
    protected $guarded = [];
    protected $primaryKey ="id";
    protected $keyType = 'string';
    

    

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
    
}
