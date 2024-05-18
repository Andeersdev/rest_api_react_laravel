<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(UserRequest $request){
        try {
            $user = User::create($request->all());
            return response()->json(['message' => 'User Created', 'user' => $user], 201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function login(AuthRequest $request){
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Incorrect Credentials.'],401);
        }
        $user = auth()->user();
        return $this->respondWithToken($token,$user);
    }

    public function logout(){
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function profile(User $user)
    {
        $user = User::find($user->id);
        return response()->json($user,200);
    }

    protected function respondWithToken($token,$user)
    {
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
