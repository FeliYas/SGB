<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Illuminate\Http\Request;

class MotorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $query = Motor::query()->orderBy('order', 'asc');

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where('name', 'LIKE', '%' . $searchTerm . '%');
        }

        $motores = $query->paginate($perPage);


        return inertia('admin/motoresAdmin', [
            'motores' => $motores,
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|string|max:255',
        ]);

        // Create the motor
        Motor::create($data);

        return redirect()->back()->with('success', 'Motor created successfully.');
    }


    public function update(Request $request)
    {
        $motor = Motor::findOrFail($request->id);
        if (!$motor) {
            return redirect()->back()->with('error', 'No se encontró el motor.');
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|string|max:255',
        ]);

        // Update the motor
        $motor->update($data);

        return redirect()->back()->with('success', 'Motor updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $motor = Motor::findOrFail($request->id);
        if (!$motor) {
            return redirect()->back()->with('error', 'No se encontró el motor.');
        }

        // Delete the motor
        $motor->delete();

        return redirect()->back()->with('success', 'Motor deleted successfully.');
    }
}
