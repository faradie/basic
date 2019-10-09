<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\UserCollections;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'DESC');
        if (request()->key != '') {
            $users = $users->where('name', 'LIKE', '%' . request()->key . '%');
        }

        return new UserCollections($users->paginate(10));
    }
    public function edit($id)
    {
        $user = User::find($id);
        return response()->json(['status' => 'success', 'data' => $user], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'id' => 'string|required|exists:users',
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|exists:users|email',
            'phone' => 'required|string|max:255'
        ]);

        $user = User::find($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone
        ]);

        return response()->json(['status' => 'success',200]);

     }
}
