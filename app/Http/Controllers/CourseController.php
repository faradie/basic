<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course;
use App\Http\Resources\CourseCollections;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::orderBy('created_at', 'DESC');
        if (request()->key != '') {
            $courses = $courses->where('name', 'LIKE', '%' . request()->key . '%');
        }

        return new CourseCollections($courses->paginate(5));
    }

    public function store(Request $request)
    {
        $this->validate($request,[
            'id' => 'string|required|unique:courses',
            'name' => 'required|string|max:100',
            'description' => 'required|max:255',
            'status'   => 'required|boolean'
        ]);
        Course::create($request->all());
        return response()->json(['status' => 'success', 200]);
     }
}
