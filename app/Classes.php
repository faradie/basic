<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    protected $guarded = [];
    protected $primaryKey ="id";
    public $incrementing = false;
    
    public function course()
    {
        return $this->belongsTo('App\Course');
    }
    public function lecture()
    {
        return $this->belongsTo('App\User');
    }
}
