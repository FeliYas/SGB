<?php

namespace App\Http\Controllers;

use App\Models\Catalogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CatalogoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $catalogos = Catalogo::orderBy('order', 'asc')->get();

        return inertia('admin/catalogosAdmin', [
            'catalogos' => $catalogos,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'order' => 'nullable|sometimes|string',
            'name' => 'required|string|max:255',
            'archivo' => 'nullable|file',
            'image' => 'nullable|sometimes|file',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        if ($request->hasFile('archivo')) {
            $data['archivo'] = $request->file('archivo')->store('archivos', 'public');
        }

        Catalogo::create($data);

        return redirect()->route('catalogos.index')->with('success', 'Catalogo created successfully.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'order' => 'nullable|sometimes|string',
            'name' => 'required|string|max:255',
            'archivo' => 'nullable|file',
            'image' => 'nullable|sometimes|file',
        ]);

        $catalogo = Catalogo::findOrFail($request->id);

        if ($request->hasFile('image')) {
            // Guardar la ruta del archivo antiguo para eliminarlo después
            $oldImagePath = $catalogo->getRawOriginal('image');

            // Guardar el nuevo archivo
            $data['image'] = $request->file('image')->store('images', 'public');

            // Eliminar el archivo antiguo si existe
            if ($oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        if ($request->hasFile('archivo')) {
            // Guardar la ruta del archivo antiguo para eliminarlo después
            $oldArchivoPath = $catalogo->getRawOriginal('archivo');

            // Guardar el nuevo archivo
            $data['archivo'] = $request->file('archivo')->store('archivos', 'public');

            // Eliminar el archivo antiguo si existe
            if ($oldArchivoPath && Storage::disk('public')->exists($oldArchivoPath)) {
                Storage::disk('public')->delete($oldArchivoPath);
            }
        }

        $catalogo->update($data);

        return redirect()->route('catalogos.index')->with('success', 'Catalogo updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $catalogo = Catalogo::findOrFail($request->id);

        // Eliminar archivos asociados si existen
        if ($catalogo->archivo && Storage::disk('public')->exists($catalogo->archivo)) {
            Storage::disk('public')->delete($catalogo->archivo);
        }
        if ($catalogo->image && Storage::disk('public')->exists($catalogo->image)) {
            Storage::disk('public')->delete($catalogo->image);
        }

        $catalogo->delete();

        return redirect()->route('catalogos.index')->with('success', 'Catalogo deleted successfully.');
    }
}
