<div class="flex flex-row h-[700px] max-md:h-fit my-10 bg-black max-md:flex-col text-white">
    <div class="w-full ">
        <img class="w-full h-full object-cover" src="{{ $bannerPortada->image ?? '' }}" alt="" />
    </div>

    <div class="flex flex-col w-full justify-center max-md:items-center max-md:justify-center   ">
        <div class="flex flex-col h-fit px-20  max-md:py-0 max-md:px-2 gap-10 max-md:gap-4">
            <h2 class="text-white text-[32px] font-bold max-md:text-center">
                {{ $bannerPortada->title ?? '' }}
            </h2>
            <div
                class="custom-container w-full h-full prose prose-sm sm:prose lg:prose-lg xl:prose-xl text-white max-md:p-6">
                {!! $bannerPortada->text ?? '' !!}
            </div>
            <a href="{{ route('nosotros') }}"
                class="py-2 px-6 bg-primary-orange text-white rounded-sm font-bold w-fit text-primary-red flex justify-center items-center hover:bg-white hover:text-primary-orange transition-colors duration-300 max-sm:self-center max-sm:mb-10">
                Más info
            </a>
        </div>

    </div>
</div>