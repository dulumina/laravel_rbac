<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'superadmin@localhost',
            'password' => bcrypt('password'),
        ]);

        // call RoleAndPermissionSeeder
        $this->call([
            RoleAndPermissionSeeder::class,
        ]);
    }
}
