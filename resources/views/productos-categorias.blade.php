@extends('layouts.default')

@section('title', 'SGB - Productos')


@section('description', $metadatos->description ?? "")
@section('keywords', $metadatos->keywords ?? "")

@section('content')

    <x-search-bar :categorias="$categorias" :marcas="$marcas" :modelos="$modelos" :motores="$motores" />
    <div class="w-[1200px] mx-auto grid grid-cols-4 min-h-[50vh] my-20">
        @foreach ($categorias as $categoria)
            <a href={{route('productos', ['tipo' => $categoria->id])}}
                class="flex flex-col items-center justify-center w-[288px] min-h-[288px] h-fit gap-5 overflow-hidden">
                <img src="{{ $categoria->image }}" alt="{{ $categoria->name }}"
                    class="w-full max-h-[288px] object-cover object-center border hover:scale-105 transition duration-300">
                <span class="text-lg uppercase">{{ $categoria->name }}</span>

            </a>
        @endforeach
    </div>
@endsection