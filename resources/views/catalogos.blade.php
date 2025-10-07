@extends('layouts.default')

@section('title', 'SGB - Catalogos')

@section('description', $metadatos->description ?? '')
@section('keywords', $metadatos->keywords ?? '')

@section('content')
    <div class="mx-auto flex w-full max-w-[1200px] text-black pt-6 text-sm">
        <a href="/" class="font-bold">Inicio</a>
        <span class="mx-1">></span>
        <p class="text-black/80">Catalogos</p>
    </div>
    <div class="w-[1200px] mx-auto grid grid-cols-2 gap-10 mt-12 mb-20 min-h-[50vh]">
        @foreach ($catalogos as $catalogo)
            <div
                class="w-full h-[70px] bg-[#F5F5F5] flex flex-row gap-2 border shadow-sm hover:shadow-lg transition duration-300">
                <div class="min-w-[68px]">
                    <img src="{{ $catalogo->image }}" alt="{{ $catalogo->name }}" class="w-full h-full object-cover">
                </div>
                <div class="w-full h-full flex items-center justify-start">
                    <div class="flex h-fit flex-col gap-1">
                        <h2 class="font-bold text-[20px]">{{ $catalogo->name }}</h2>
                        <p class="text-[14px]">{{ $catalogo->formato ?? 'PDF' }} - {{ $catalogo->peso ?? '123 kb' }}</p>
                    </div>
                </div>
                <div class="h-full flex items-center pr-4">
                    <a class="cursor-pointer" href="{{ asset('storage/' . $catalogo->archivo) }}"
                        download="{{ $catalogo->name }}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-download-icon lucide-download">
                            <path d="M12 15V3" />
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <path d="m7 10 5 5 5-5" />
                        </svg>
                    </a>
                </div>
            </div>
        @endforeach
    </div>
@endsection
