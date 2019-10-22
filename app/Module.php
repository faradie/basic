<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $guarded = [];
    protected $primaryKey ="id";
    public $incrementing = false;
    protected $keyType = 'string';
}
