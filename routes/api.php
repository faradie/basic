<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', 'Auth\RegisterController@register');
Route::post('/login', 'Auth\LoginController@login');

Route::get('/roles/{id}', 'RolePermissionController@getUserRole')->name('get_user_role');
Route::get('/roles', 'RolePermissionController@getAllRole')->name('roles');
Route::get('/permissions', 'RolePermissionController@getAllPermission')->name('permission');
Route::get('/permissions/{id}', 'RolePermissionController@getUserPermissions')->name('get_user_permissions');
Route::post('role-permission', 'RolePermissionController@getRolePermission')->name('role_permission');
Route::post('/set-role-permissions', 'RolePermissionController@setRolePermission')->name('set_role_permission');

Route::group(['middleware' => 'auth:api'], function () {
    Route::resource('/users', 'UsersController')->except(['show']);
    Route::resource('/courses', 'CourseController')->except(['show']);
    Route::get('/course/deleteAll', 'CourseController@deleteAll');
});
