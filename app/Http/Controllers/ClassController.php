<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes;

class ClassController extends Controller
{
    public function index()
    {
        $classes = Classes::orderBy('created_at', 'DESC');
        if (request()->key != '') {
            $classes = $classes->where('name', 'LIKE', '%' . request()->key . '%');
        }

        return new CourseCollections($courses->paginate(3));
    }
}
