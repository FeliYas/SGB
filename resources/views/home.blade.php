@extends('layouts.default')

@section('title', 'SGB - Inicio')

@section('description', $metadatos->description ?? "")
@section('keywords', $metadatos->keywords ?? "")

@section('content')
    <x-slider :sliders="$sliders" />
    <x-search-bar :categorias="$categorias" :marcas="$marcas" :modelos="$modelos" />
    <x-productos-destacados :productos="$productos" />

    <x-banner-portada :bannerPortada="$bannerPortada" />
    <x-lanzamientos-productos :productos="$productos" />
    <x-novedades-inicio :novedades="$novedades" />
@endsection