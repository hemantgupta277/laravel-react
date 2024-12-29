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
            'queryParams' => request()->query() ?:null
        ]);
    }

    public function create(): Response|ResponseFactory
    {
        $projects = Project::all();
        $users = User::all();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image']??null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if($image) {
            $data['image_path'] = $image->store('tasks', 'public');
        }
        Task::create($data);
        return to_route('tasks.index')->with('success', 'Task created successfully.');
    }

    public function show(Task $task)
    {
        //
    }

    public function edit(Task $task)
    {
        //
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image']??null;
        $data['updated_by'] = Auth::id();
        if($image) {
            if($task->image) Storage::disk('public')->delete($task->image_path);
        }
        $data['image_path'] = $image->store('tasks', 'public');
        $task->update($data);
        return to_route('tasks.index')->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return to_route('task.index');
    }
}
