<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DeliveryPersonMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if ($user instanceof \App\Models\User) {
        if ($user && $user->hasRole('delivery_person')) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

        return response()->json(['message' => 'Error getting role'], 401);
    }
}
