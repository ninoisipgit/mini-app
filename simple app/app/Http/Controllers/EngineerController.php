<?php

namespace App\Http\Controllers;

use App\Models\Engineers;
use Illuminate\Http\Request;

class EngineerController extends Controller
{
    public function index()
    {
        $eng = Engineers::all();
        return response()->json($eng);
    }

    public function store(Request $request)
    {
        $eng = Engineers::create($request->all());
        return response()->json($eng, 201);
    }

    public function show($id)
    {
        $eng = Engineers::find($id);
        return response()->json($eng);
    }

    public function update(Request $request, $id)
    {
        $eng = Engineers::find($id);
        $eng->update($request->all());
        return response()->json($eng);
    }

    public function destroy($id)
    {
        Engineers::destroy($id);
        return response()->json(null, 204);
    }
}
