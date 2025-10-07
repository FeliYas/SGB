@extends('layouts.default')

@section('title', 'SGB - Inicio')

@section('description', $metadatos->description ?? "")
@section('keywords', $metadatos->keywords ?? "")

@section('content')

    @if (session('success'))
        <div id="alert-success" 
            class="flex items-center justify-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 fixed top-20 z-50 left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
            role="alert">
            {{ session('success') }}
        </div>

        <script>
            setTimeout(() => {
                const alert = document.getElementById('alert-success');
                if (alert) {
                    alert.style.opacity = '0';
                    setTimeout(() => alert.remove(), 500);
                }
            }, 5000);
        </script>
    @endif


    <x-slider :sliders="$sliders" />
    <x-search-bar :categorias="$categorias" :marcas="$marcas" :modelos="$modelos" :motores="$motores" />
    <x-productos-destacados :productos="$productos" />

    <x-banner-portada :bannerPortada="$bannerPortada" />
    <x-lanzamientos-productos :productos="$productosLanzamientos" />
    <x-novedades-inicio :novedades="$novedades" />
@endsection