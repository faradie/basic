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

        return new CourseCollections($courses->paginate(3));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'id' => 'string|required|unique:courses',
            'name' => 'required|string|max:100',
            'description' => 'required|max:255',
            'status'   => 'required|boolean'
        ]);
        Course::create($request->all());
        return response()->json(['status' => 'success', 200]);
    }

    public function edit($id)
    {
        $course = Course::find($id);
        return response()->json(['status' => 'success', 'data' => $course], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'id' => 'string|required|exists:courses',
            'name' => 'required|string|max:100',
            'description' => 'required|max:255',
            'status'   => 'required|boolean'
        ]);

        $course = Course::find($id);
        $course->update([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status
        ]);

        return response()->json(['status' => 'success'], 200);
    }

    public function destroy($id)
    {
        $course = Course::find($id);
        $course->delete();
        return response()->json(['status' => 'success'], 200);
    }
}
