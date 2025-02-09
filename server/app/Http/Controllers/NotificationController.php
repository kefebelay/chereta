<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
         public function markAsRead($id)
        {
            $notification = Notification::findOrFail($id);
            $notification->update(['status' => 'read']);

            return response()->json(['message' => 'Notification marked as read']);
        }
        public function getUnreadNotifications($id){
            $notifications = Notification::where('user_id', $id)->where('status', 'unread')->count();
            return response()->json($notifications);
        }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $notifications = Notification::where('user_id', $id)->orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $notification = Notification::findOrFail($id);
            $notification->delete();
            return response()->json(['message' => 'Notification deleted successfully']);
        }catch(Exception $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
