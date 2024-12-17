<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Inertia\Response;
use Inertia\ResponseFactory;

class ProjectController extends Controller
{

    public function index(): Response|ResponseFactory
    {
        $projects = Project::query()->paginate(10)->onEachSide(1);
        return inertia('Project/Index',[
            'projects' => ProjectResource::collection($projects)
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
        //
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
