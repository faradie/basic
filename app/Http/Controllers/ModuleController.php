<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Module;

class ModuleController extends Controller
{
    public function getModule($id)
    {
        $module = Module::where('course_id', '=', $id);
        return response()->json(['status' => 'success', 'data' => $module],200);
    }
}
