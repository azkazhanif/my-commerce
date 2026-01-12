<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class SuperadminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::beginTransaction();
        try {
            $role = Role::firstOrCreate([
                'name' => 'superadmin',
            ]);

            $admin = User::firstOrCreate(
                [
                    'email' => 'admin@ecommerce.test',
                ],
                [
                    'name' => 'Super Admin',
                    'password' => Hash::make('Admin123!@#'),
                    'is_verified' => true,
                    'email_verified_at' => now(),
                ]
            );

            $admin->roles()->syncWithoutDetaching([$role->id]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to create superadmin role: ' . $e->getMessage());
        }
    }
}
