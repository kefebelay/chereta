<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class AuthenticatedSessionController extends Controller
{
    use HasApiTokens;

    /**
     * Handle an incoming authentication request.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function store(LoginRequest $request)
    {

   $request->validate([
       'email' => ['required', 'string', 'email',  'lowercase'],
       'password' => ['required', 'string'],
   ]);
   $user = User::where('email', $request->email)->first();

   if (! $user || ! Hash::check($request->password, $user->password)) {

           return response()->json(['email' => ['The provided credentials are incorrect.'] ], 401);

   }

   $token = $user->createToken('auth_token')->plainTextToken;
   return response()->json(['token' => $token, 'message' => 'Logged in successfullyyyyy', 'user' => $user], 200);
}

    /**
     * Destroy an authenticated session.
     *
     * @param Request $request
     * @return Response
     */
    public function destroy(LoginRequest $request)
    {
        if (! Auth::guard()->check()) {
            return response()->json(['error' => 'You are not logged in'], 401);
        }
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
