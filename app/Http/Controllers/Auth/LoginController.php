<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
{
    $this->validate($request, [
        'id' => ['required', 'string', 'max:12'],
        'password' => 'required'
    ]);

    $auth = $request->except(['remember_me']);
    
    if (auth()->attempt($auth)) {
        auth()->user()->update(['api_token' => Str::random(40)]);
        $user = User::find($request->id);
        $role = $user->getRoleNames();
        $permissions = $user->getAllPermissions();
        return response()->json(['status' => 'success', 'data' => $user,'role' => $role, 'permissions' => $permissions], 200);
    }
    return response()->json(['status' => 'failed']);
}

}
