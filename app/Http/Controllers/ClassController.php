<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes;
use App\Course;
use App\User;
use App\Http\Resources\ClassCollection;
use Webpatser\Uuid\Uuid;

class ClassController extends Controller
{
    public function index()
    {
        $classes = Classes::with(['course','lecture'])->orderBy('created_at', 'DESC');
        if (request()->key != '') {
            $classes = $classes->where('name', 'LIKE', '%' . request()->key . '%');
        }

        return new ClassCollection($classes->paginate(10));
    }

    public function get_mk_ds()
    { 
        $courses = Course::all()->where('status','=',true);
        $lectures = User::role('lectur')->get();
        return response()->json(['status' => 'success', 'courses' => $courses, 'lectur' => $lectures], 200);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'course_id' => 'string|required',
            'lecture_id' => 'required|string',
            'day' => 'required|max:6',
            'attrib'   => 'required|max:1',
            'start_time'   => 'required|string',
            'end_time'   => 'required|string',
        ]);

        $uid = Uuid::generate();
        Classes::create([
            'id' => $uid,
            'lecture_id' => $request->lecture_id,
            'course_id' => $request->course_id,
            'day'=>$request->day,
            'attrib' => $request->attrib,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time
        ]);
        return response()->json(['status' => 'success', 200]);
    }

}
