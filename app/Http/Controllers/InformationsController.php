<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Informations;
use App\Http\Resources\InformationsCollections;
use Webpatser\Uuid\Uuid;
use Illuminate\Support\Facades\DB;

class InformationsController extends Controller
{
    public function index()
    {
        $informations = Informations::with(['user', 'category'])->orderBy('created_at', 'DESC');
        if (request()->key != '') {
            $informations = $informations->where('title', 'LIKE', '%' . request()->key . '%');
        }

        return new InformationsCollections($informations->paginate(10));
    }
    public function infoIndex()
    {
        $informations = Informations::with(['user', 'category'])->orderBy('created_at', 'DESC');
        if (request()->key != '') {
            $informations = $informations->where('content', 'LIKE', '%' . request()->key . '%');
        }

        return new InformationsCollections($informations->paginate(10));
    }

    public function infoDetail($id)
    {
        $information = Informations::with(['user', 'category'])->find($id);
        return response()->json(['status' => 'success', 'data' => $information], 200);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'string|required|max:100',
            'content' => 'string|required',
            'category_id' => 'string|required',
            'user_id' => 'string|required',
        ]);

        $uid = Uuid::generate();
        Informations::create([
            'id' => "$uid",
            'title' => "$request->title",
            'content' => "$request->content",
            'category_id' => "$request->category_id",
            'user_id' => "$request->user_id"
        ]);

        return response()->json(['status' => 'success'], 200);
    }

    public function edit($id)
    {
        $information = Informations::with(['user', 'category'])->get()->find($id);
        return response()->json(['status' => 'success', 'data' => $information], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'string|required|max:100',
            'content' => 'string|required',
            'category_id' => 'string|required',
            'user_id' => 'string|required',
        ]);

        $information = Informations::find($id);
        $information->update([
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id
        ]);
        return response()->json(['status' => 'success'], 200);
    }

    public function destroy($id)
    {
        $information = Informations::find($id);
        $information->delete();

        return response()->json(['status' => 'success'], 200);
    }

    public function deleteAllInfo()
    {
        DB::table('informations')->delete();
        return response()->json(['status' => 'success'], 200);
    }
}
