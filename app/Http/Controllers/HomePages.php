<?php

namespace App\Http\Controllers;

use App\Models\ArchivoCalidad;
use App\Models\BannerPortada;
use App\Models\Calidad;
use App\Models\Categoria;
use App\Models\Contacto;
use App\Models\Marca;
use App\Models\Metadatos;
use App\Models\Modelo;
use App\Models\Nosotros;
use App\Models\Novedades;
use App\Models\Producto;
use App\Models\Slider;
use App\Models\SubCategoria;
use App\Models\Valores;
use DragonCode\Contracts\Cashier\Resources\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomePages extends Controller
{
    public function home()
    {
        if (Auth::check()) {
            return redirect('/privada/productos');
        }

        $metadatos = Metadatos::where('title', 'Inicio')->first();

        $categorias = Categoria::orderBy('order', 'asc')->get();
        $subcategorias = SubCategoria::orderBy('order', 'asc')->get();
        $sliders = Slider::orderBy('order', 'asc')->get();
        $bannerPortada = BannerPortada::first();
        $novedades = Novedades::where('featured', true)->orderBy('order', 'asc')->get();
        $productos = Producto::where('destacado', true)
            ->orderBy('order', 'asc')
            ->with(['imagenes', 'marca', 'modelo', 'precio', 'categoria'])
            ->get();
        $marcas = Marca::orderBy('order', 'asc')->get();
        $modelos = Modelo::orderBy('order', 'asc')->get();

        return view('home', [
            'sliders' => $sliders,
            'bannerPortada' => $bannerPortada,
            'novedades' => $novedades,
            'categorias' => $categorias,
            'subcategorias' => $subcategorias,
            'productos' => $productos,
            'metadatos' => $metadatos,
            'marcas' => $marcas,
            'modelos' => $modelos,
        ]);
    }

    public function nosotros()
    {
        $metadatos = Metadatos::where('title', 'Nosotros')->first();
        $nosotros = Nosotros::first();
        $valores = Valores::first();
        return view('empresa', [
            'nosotros' => $nosotros,
            'valores' => $valores,
            'metadatos' => $metadatos,
        ]);
    }

    public function calidad()
    {
        $metadatos = Metadatos::where('title', 'Calidad')->first();
        $calidad = Calidad::first();
        $archivos = ArchivoCalidad::orderBy('order', 'asc')->get();

        return view('calidad', [
            'calidad' => $calidad,
            'archivos' => $archivos,
            'metadatos' => $metadatos,
        ]);
    }

    public function novedades()
    {
        $metadatos = Metadatos::where('title', 'Novedades')->first();
        $novedades = Novedades::orderBy('order', 'asc')
            ->get();
        return view('lanzamientos', [
            'novedades' => $novedades,
            'metadatos' => $metadatos,
        ]);
    }

    public function contacto(Request $request)
    {
        $metadatos = Metadatos::where('title', 'Contacto')->first();
        $contacto = Contacto::first();
        return view('contacto', [
            'contacto' => $contacto,
            'mensaje' => $request->mensaje ?? null,
            'metadatos' => $metadatos,
        ]);
    }
}
