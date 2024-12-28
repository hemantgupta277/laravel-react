<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;

class UserController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        $q = User::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');

        if(request("name"))
            $q->where('name', 'like', '%' . request("name") . '%');
        if(request("email"))
            $q->where('email', 'like', '%' . request("email") . '%');

        $users = $q->orderBy($sort_field, $sort_order)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("User/Index", [
            "users" => UserCrudResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create(): Response|ResponseFactory
    {
        return inertia("User/Create");
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        User::create($data);
        return to_route("user.index")->with("success", "User created successfully");
    }

    public function show(User $user)
    {
        //
    }

    public function edit(User $user): Response|ResponseFactory
    {
        return inertia("User/Edit", [
            "user" => new UserCrudResource($user),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if($password) $data['password'] = bcrypt($password);
        else unset($data['password']);
        $user->update($data);
        return to_route("user.index")->with("success", "User updated successfully");
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return to_route("user.index")->with("success", "User deleted successfully");
    }
}
