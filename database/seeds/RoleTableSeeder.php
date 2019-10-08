<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()['cache']->forget('spatie.permission.cache');

        Permission::create(['name' => 'add course']);
        Permission::create(['name' => 'edit course']);
        Permission::create(['name' => 'delete course']);
        Permission::create(['name' => 'add class']);
        Permission::create(['name' => 'edit class']);
        Permission::create(['name' => 'delete class']);
        Permission::create(['name' => 'add information']);
        Permission::create(['name' => 'edit information']);
        Permission::create(['name' => 'delete information']);
        Permission::create(['name' => 'add score']);
        Permission::create(['name' => 'edit score']);
        Permission::create(['name' => 'delete score']);
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'delete user']);
        Permission::create(['name' => 'add category']);
        Permission::create(['name' => 'edit category']);
        Permission::create(['name' => 'delete category']);

        Permission::create(['name' => 'add module']);
        Permission::create(['name' => 'edit module']);
        Permission::create(['name' => 'delete module']);
        Permission::create(['name' => 'add presence']);
        Permission::create(['name' => 'edit presence']);
        Permission::create(['name' => 'delete presence']);

        Permission::create(['name' => 'view course']);
        Permission::create(['name' => 'view module']);
        Permission::create(['name' => 'view score']);
        Permission::create(['name' => 'view presence']);
        Permission::create(['name' => 'view category']);
        Permission::create(['name' => 'view information']);
        Permission::create(['name' => 'upload task']);

        $role = Role::create(['name' => 'assistant']);
        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'lectur'])
            ->givePermissionTo(['add module', 'edit module', 'delete module', 'add presence', 'edit presence', 'delete presence']);

        $role = Role::create(['name' => 'student'])
            ->givePermissionTo(['view course', 'view module', 'view score', 'view presence', 'view category', 'view information', 'upload task']);
    }
}
