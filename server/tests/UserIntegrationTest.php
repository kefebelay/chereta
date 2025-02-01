<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_registration()
    {
        $response = $this->post('/api/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['user' => ['id', 'name', 'email']]);
    }

    public function test_user_login()
    {
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->post('/api/login', [
            'email' => 'testuser@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);
    }

    public function test_fetch_logged_in_user()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/api/user');

        $response->assertStatus(200);
        $response->assertJsonStructure(['id', 'name', 'email']);
    }

    public function test_user_logout()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/api/logout');

        $response->assertStatus(204);
    }

    public function test_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->delete('/api/user/' . $user->id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
