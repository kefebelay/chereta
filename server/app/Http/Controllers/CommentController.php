<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
   /* public function index(  $listing)
{
    return $listing->comments()->with('user')->get();
}

public function store(Request $request,  $listing)
{
    $validatedData = $request->validate([
        'content' => 'required|string',
    ]);

    $comment = new Comment();
    $comment->user_id = auth()->id();
    $comment->listing_id = $listing->id;
    $comment->content = $validatedData['content'];
    $comment->save();

    return response()->json($comment, 201);
}

public function show(Comment $comment)
{
    return $comment;
}

public function update(Request $request,  $comment)
{
    $validatedData = $request->validate([
        'content' => 'required|string',
    ]);

    $comment->update($validatedData);

    return response()->json($comment, 200);
}

public function destroy(Comment $comment)
{
    $comment->delete();

    return response()->json(null, 204);
}*/


}
