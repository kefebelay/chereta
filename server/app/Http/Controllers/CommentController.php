<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class CommentController extends Controller
{

     /* Display a listing of comments.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {

            $comments = Comment::with(['user', 'listing', 'replies.user'])->whereNull('parent_id')->get();
            return response()->json($comments, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching comments', 'error' => $e->getMessage()], 500);
        }
    }

    /* Store a newly created comment or reply in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'listing_id' => 'required|exists:listings,id',
                'comment' => 'required|string|max:1000',
                'parent_id' => 'nullable|exists:comments,id',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }


            $comment = Comment::create([
                'user_id' => $request->user_id,
                'listing_id' => $request->listing_id,
                'comment' => $request->comment,
                'parent_id' => $request->parent_id,
            ]);

            return response()->json(['message' => 'Comment created successfully', 'comment' => $comment], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error creating comment', 'error' => $e->getMessage()], 500);
        }
    }

    /* Display the specified comment.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $comment = Comment::with(['user', 'listing', 'replies.user'])->findOrFail($id);
            return response()->json($comment, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching comment', 'error' => $e->getMessage()], 500);
        }
    }

    /* Update the specified comment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {

            $validator = Validator::make($request->all(), [
                'comment' => 'required|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }


            $comment = Comment::findOrFail($id);
            $comment->update(['comment' => $request->comment]);

            return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error updating comment', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified comment from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $comment = Comment::findOrFail($id);
            $comment->delete();

            return response()->json(['message' => 'Comment deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error deleting comment', 'error' => $e->getMessage()], 500);
        }
    }
}
