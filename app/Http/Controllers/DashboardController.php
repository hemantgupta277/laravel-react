<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $allTasks = Task::all();
        $tasks = Task::where('assigned_user_id', Auth::id())->get();
        $pendingTasks = $allTasks->where('status', 'pending')->count();
        $myPendingTasks = $tasks->where('status', 'pending')->count();
        $inProgressTasks = $allTasks->where('status', 'in_progress')->count();
        $myInProgressTasks = $tasks->where('status', 'in_progress')->count();
        $completedTasks = $allTasks->where('status', 'completed')->count();
        $myCompletedTasks = $tasks->where('status', 'completed')->count();
        $activeTasks = TaskResource::collection(Task::where('assigned_user_id', Auth::id())->whereIn('status', ['pending', 'in_progress'])->orderBy('due_date', 'asc')->limit(10)->get());
        return inertia('Dashboard',
            compact(
                'pendingTasks',
                'myPendingTasks',
                'inProgressTasks',
                'myInProgressTasks',
                'completedTasks',
                'myCompletedTasks',
                'activeTasks',
            ));
    }
}
