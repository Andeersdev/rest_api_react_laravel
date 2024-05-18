<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function index()
    {
        $tasks = Task::where('user_id', auth()->id())->get();
        return response()->json($tasks,200);
    }

    public function store(TaskRequest $request)
    {
        try {
            $request['user_id'] = auth()->id();
            $task = Task::create($request->all());
            return response()->json(['message' => 'Task Created', 'task' => $task],201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show(Task $task)
    {
        $task = Task::find($task->id);
        return response()->json($task,200);
    }

    public function update(TaskRequest $request, Task $task)
    {
        try {
            $task = Task::find($task->id);
            $task->update($request->all());
            return response()->json(['message' => 'Task Updated', 'task' => $task],200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }


    public function destroy(Task $task)
    {
        $task = Task::find($task->id)->delete();
        return response()->json(['message' => 'Task Deleted'],200);
    }
}
