<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\RolePermissionCollection;


class RolePermissionController extends Controller
{
    public function getAllRole()
    {
        $roles = Role::all();
        return response()->json(['status' => 'success', 'data' => $roles]);
    }

    public function getAllPermission()
    {
        $permission = Permission::all();
        return response()->json(['status' => 'success', 'data' => $permission]);
    }

    public function getUserRole($id)
    {
        $user = User::find($id);
        $role = $user->getRoleNames();
        return response()->json(['status' => 'success', 'data' => $role]);
    }

    public function getUserPermissions($id)
    {
        $user = User::find($id);
        $permissions = $user->getAllPermissions();
        return response()->json(['status' => 'success', 'data' => $permissions]);
    }

    public function getRolePermission(Request $request)
    {
        $hasPermission = DB::table('role_has_permissions')
            ->select('permissions.name')
            ->join('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
            ->where('role_id', $request->role_id)->get();
        return response()->json(['status' => 'success', 'data' => $hasPermission]);
    }

    public function setRolePermission(Request $request)
    {
        $user = User::find($request->user_id);
        if ($request->role_name != null || $request->role_name != "") {
            $user->syncRoles($request->role_name);
        }
        
        if (count($request->permissions) > 0) {
            for ($i=0; $i <count($request->permissions) ; $i++) { 
                $new_permission[] = $request->permissions[$i]["name"];
            }
            $user->syncPermissions($new_permission);
        }
        return response()->json(['status' => 'success']);
    }
}
