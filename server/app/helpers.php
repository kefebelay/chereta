<?php
use App\Models\Notification;

if (!function_exists('sendNotification')) {
    function sendNotification($userId, $title, $description, $status = 'unread')
    {
        return Notification::create([
            'user_id' => $userId,
            'title' => $title,
            'description' => $description,
            'status' => $status
        ]);
    }
}
