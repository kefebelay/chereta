<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['admin', 'individual_seller', 'company_seller', 'delivery_person', 'buyer'];
        foreach ($roles as $role) {
           Role::firstOrCreate(['name' => $role]);
        }
    }
}
