<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;

class ProjectController extends Controller
{

    public function index(): Response|ResponseFactory
    {
        $query = Project::query();
        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }if (request('status')) {
            $query->where('status', request('status'));
        }
        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');
        $projects = $query->orderBy($sort_field, $sort_order)->paginate(10)->onEachSide(1);
        return inertia('Project/Index',[
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?:null
        ]);
    }

    public function create()
    {
        //
    }

    public function store(StoreProjectRequest $request)
    {
        //
    }

    public function show(Project $project)
    {
        $q = $project->tasks();
        if(request('name')) {
            $q->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $q->where('status', request('status'));
        }
        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');
        $tasks = $q->orderBy($sort_field, $sort_order)
            ->paginate(10)
            ->onEachSide(1);
        return Inertia::render('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?:null
        ]);
    }

    public function edit(Project $project)
    {
        //
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    public function destroy(Project $project)
    {
        //
    }
}
