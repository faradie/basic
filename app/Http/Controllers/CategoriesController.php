<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Http\Resources\CategoriesCollections;
use Webpatser\Uuid\Uuid;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('created_at', 'DESC');
        if (request()->key != '') {
            $categories = $categories->where('title', 'LIKE', '%' . request()->key . '%');
        }

        return new CategoriesCollections($categories->paginate(10));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'string|required|max:100',
            'description' => 'string|required|max:255'
        ]);

        $uid = Uuid::generate();
        Category::create([
            'id' => $uid,
            'title' => $request->title,
            'description' => $request->description
        ]);

        return response()->json(['status' => 'success'], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'string|required|max:100',
            'description' => 'string|required|max:255'
        ]);

        $category = Category::find($id);
        $category->update([
            'title' => $request->title,
            'description' => $request->description
        ]);

        return response()->json(['status' => 'success'], 200);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json(['status' => 'success'], 200);
    }
}
