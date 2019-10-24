<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Module;
use App\Http\Resources\ModuleCollections;
use Webpatser\Uuid\Uuid;
use Illuminate\Support\Facades\DB;
use Storage;

class ModuleController extends Controller
{
    public function index()
    {
        $module = Module::with(['user', 'course'])->get()->groupBy('course_id');
        return response()->json(['status' => 'success', 'data' => $module], 200);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            // 'title' => 'string|max:100',
            // 'description' => 'string|max:255',
            'file' => 'required',
            'course_id' => 'string|required',
            'user_id' => 'string|required'
        ]);
        DB::beginTransaction();
        $file = $request->file('file');
        $name = $request->file('file')->getClientOriginalName() . '.' . $file->getClientOriginalExtension();
        $description = NULL;
        if ($request->title != null) {
            $name = $request->title . '-' . time() . '.' . $file->getClientOriginalExtension();
        }
        if ($request->description != null) {
            $description = $request->description;
        }

        $path = $file->storeAs('materi', $name);

        $uid = Uuid::generate();

        Module::create([
            'id' => "$uid",
            'description' => "$description",
            'file' => "$path",
            'course_id' => "$request->course_id",
            'user_id' => "$request->user_id"
        ]);

        DB::commit();
        return response()->json(['status' => 'success'], 200);
    }

    public function fileDownload($id)
    {
        $file = Module::find($id);

        $specified = public_path() . '/basicFiles/' . $file->file;
        $headers = array(

            'Content-Type: application/pdf',
            'Accept: application/vnd.ms-excel'
        );

        return response()->download($specified, $id, $headers);
    }

    public function fileDelete($id)
    {
        $thisFile = Module::find($id);
        Storage::delete($thisFile->file);

        $thisFile->delete();

        return response()->json(['status' => 'success'], 200);
    }
}
