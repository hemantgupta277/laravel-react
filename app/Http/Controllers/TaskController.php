<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Inertia\Response;
use Inertia\ResponseFactory;

class TaskController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        $query = Task::query();
        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }if (request('status')) {
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

    public function create()
    {
        //
    }

    public function store(StoreTaskRequest $request)
    {
        //
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
        //
    }

    public function destroy(Task $task)
    {
        //
    }
}
