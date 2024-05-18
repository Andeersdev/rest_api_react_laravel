<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;

class UserController extends Controller
{
    
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    
    public function store(UserRequest $request)
    {
        try {
            $user = User::create($request->all());
            return response()->json(['message' => 'User Created', 'user' => $user], 201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    
    public function show(User $user)
    {
        $user = User::find($user->id);
        return response()->json($user,200);
    }

    
    public function update(UserRequest $request, User $user)
    {
        try {
            $user = User::find($user->id);
            $user->update($request->all());
            return response()->json(['message' => 'User Updated', 'user' => $user],200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    
    public function destroy(User $user)
    {
        User::find($user->id)->delete();
        return response()->json(['message' => 'User Deleted'], 200);
    }
}
