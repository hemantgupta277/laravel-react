<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
            'queryParams' => request()->query() ?:null,
            'success' => session('success'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Project/Create');
    }

    public function store(StoreProjectRequest $request)
    {
        $image_path = null;
        if($request->file('image')){
            $image_path = $request->file('image')->store('images','public');
        }
        Project::create([
            'image_path' => $image_path,
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'due_date' => $request->input('due_date'),
            'created_by' => Auth::id(),
            'updated_by' => Auth::id()
        ]);
        return to_route("project.index")->with('success', 'Project created successfully.');
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
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $image_path = null;
        if($request->file('image')){
            if($project->image_path)
                Storage::disk('public')->delete($project->image_path);
            $image_path = $request->file('image')->store('images','public');
        }
        $project->update([
            'image_path' => $image_path,
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'due_date' => $request->input('due_date'),
            'updated_by' => Auth::id()
        ]);
        return to_route("project.index")->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->tasks()->delete();
        $project->delete();
        return to_route("project.index")->with('success', 'Project '. $project->name. ' deleted successfully.');
    }
}
