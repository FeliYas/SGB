@extends('layouts.default')

@section('title', 'SGB - Inicio')

@section('description', $metadatos->description ?? "")
@section('keywords', $metadatos->keywords ?? "")

@section('content')
    <x-slider :sliders="$sliders" />
    <x-search-bar :categorias="$categorias" :marcas="$marcas" :modelos="$modelos" :motores="$motores" />
    <x-productos-destacados :productos="$productos" />

    <x-banner-portada :bannerPortada="$bannerPortada" />
    <x-lanzamientos-productos :productos="$productosLanzamientos" />
    <x-novedades-inicio :novedades="$novedades" />
@endsection