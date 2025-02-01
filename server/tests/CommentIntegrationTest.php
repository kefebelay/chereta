<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Comment;
use App\Models\Listing;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_fetch_comments()
    {
        $user = AuthUser::factory()->create();
        $listing = Listing::factory()->create();
        Comment::factory()->create(['user_id' => $user->id, 'listing_id' => $listing->id]);

        $response = $this->actingAs($user)->get('/api/comments');

        $response->assertStatus(200);
        $response->assertJsonStructure([['id', 'comment', 'user_id', 'listing_id']]);
    }
}
