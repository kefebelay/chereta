<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Comment;
use App\Models\User;
use App\Models\Listing;

class CommentTest extends TestCase
{
    public function test_create_comment()
    {
        $user = User::factory()->create();
        $listing = Listing::factory()->create();

        $comment = Comment::create([
            'user_id' => $user->id,
            'listing_id' => $listing->id,
            'comment' => 'This is a test comment',
            'parent_id' => null,
        ]);

        $this->assertDatabaseHas('comments', ['comment' => 'This is a test comment']);
    }
}
