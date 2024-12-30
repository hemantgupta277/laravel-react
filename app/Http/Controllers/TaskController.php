<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Inertia\ResponseFactory;

class TaskController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        $query = Task::query();
        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');
        $tasks = $query->orderBy($sort_field, $sort_order)->paginate(10)->onEachSide(1);
        return inertia('Task/Index',[
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?:null,
            'success' => session('success'),
        ]);
    }

    public function create(): Response|ResponseFactory
    {
        $projects = Project::orderBy('name')->get();
        $users = User::orderBy('name')->get();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['image_path'] = null;
        if($request->file('image')){
            $data['image_path'] = $request->file('image')->store('images','public');
            unset($data['image']);
        } else {
            unset($data['image']);
        }
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $assigned_user = $data['assigned_user_id']??null;
        if(!$assigned_user) $assigned_user = Auth::id();
        Task::create($data);
        return to_route('task.index')->with('success', 'Task created successfully.');
    }

    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    public function edit(Task $task): Response|ResponseFactory
    {
        $projects = Project::orderBy('name')->get();
        $users = User::orderBy('name')->get();
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if($image) {
            if($task->image) Storage::disk('public')->delete($task->image_path);
            $data['image_path'] = $image->store('tasks', 'public');
        }
        $task->update($data);
        return to_route('task.index')->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return to_route('task.index')->with('success', 'Task deleted successfully.');
    }

    public function myTasks(): Response|ResponseFactory
    {
        $query = Task::where('assigned_user_id', Auth::id());
        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');
        $tasks = $query->orderBy($sort_field, $sort_order)->paginate(10)->onEachSide(1);
        return inertia('Task/Index',[
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?:null,
            'success' => session('success'),
        ]);
    }
}
