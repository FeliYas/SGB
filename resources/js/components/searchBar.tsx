import { useForm } from '@inertiajs/react';

const SearchBar = ({ marcas = [], modelos = [], motores = [], categorias = [], filters = {} }) => {
    const { data, setData, get, processing } = useForm({
        marca: filters.marca || '',
        modelo: filters.modelo || '',
        motor: filters.motor || '',
        code: filters.code || '',
        code_oem: filters.codeoem || '',
        tipo: filters.tipo || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get('/productos', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeFilter = (filterName) => {
        const newFilters = { ...data };
        delete newFilters[filterName];

        get('/productos', {
            data: newFilters,
            preserveState: true,
            preserveScroll: true,
        });
    };

    const CloseIcon = () => (
        <svg className="h-4 w-4 max-sm:h-3 max-sm:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    );

    return (
        <div className="flex h-auto min-h-[195px] w-full items-center bg-black py-6 max-lg:min-h-0 max-lg:py-4">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex h-auto w-[1200px] flex-col items-start gap-6 max-xl:w-full max-xl:px-6 max-lg:px-4 max-sm:gap-4 max-sm:px-4 lg:h-[123px] lg:flex-row lg:items-center"
            >
                {/* Sección: Por vehículo / Código */}
                <div className="flex w-full flex-col gap-4 max-sm:gap-3 lg:w-full">
                    <h2 className="border-b pb-1 text-[24px] font-bold text-white max-md:text-[20px] max-sm:text-[18px]">Por vehículo / Código</h2>

                    {/* Contenedor de campos */}
                    <div className="grid grid-cols-1 gap-4 max-sm:gap-3 md:grid-cols-2 xl:grid-cols-6">
                        {/* Marca */}
                        <div className="flex w-full flex-col gap-2">
                            <label htmlFor="marca" className="text-[16px] text-white max-sm:text-[14px]">
                                Marca
                            </label>
                            <div className="relative">
                                <select
                                    className="focus:outline-primary-orange w-full rounded-sm bg-white p-2 pr-10 text-sm outline-transparent transition duration-300 focus:outline max-sm:text-xs"
                                    name="marca"
                                    id="marca"
                                    value={data.marca}
                                    onChange={(e) => setData('marca', e.target.value)}
                                >
                                    <option value="">Elegir marca</option>
                                    {marcas.map((marcaItem) => (
                                        <option key={marcaItem.id} value={marcaItem.id}>
                                            {marcaItem.name}
                                        </option>
                                    ))}
                                </select>
                                {data.marca && (
                                    <button
                                        type="button"
                                        onClick={() => removeFilter('marca')}
                                        className="absolute top-1/2 right-5 -translate-y-1/2 transform text-gray-400 transition duration-200 hover:text-red-500"
                                        title="Eliminar filtro"
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Modelo */}
                        <div className="flex w-full flex-col gap-2">
                            <label htmlFor="modelo" className="text-[16px] text-white max-sm:text-[14px]">
                                Modelo
                            </label>
                            <div className="relative">
                                <select
                                    className="focus:outline-primary-orange w-full rounded-sm bg-white p-2 pr-10 text-sm outline-transparent transition duration-300 focus:outline max-sm:text-xs"
                                    name="modelo"
                                    id="modelo"
                                    value={data.modelo}
                                    onChange={(e) => setData('modelo', e.target.value)}
                                >
                                    <option value="">Elegir modelo</option>
                                    {modelos.map((modeloItem) => (
                                        <option key={modeloItem.id} value={modeloItem.id}>
                                            {modeloItem.name}
                                        </option>
                                    ))}
                                </select>
                                {data.modelo && (
                                    <button
                                        type="button"
                                        onClick={() => removeFilter('modelo')}
                                        className="absolute top-1/2 right-5 -translate-y-1/2 transform text-gray-400 transition duration-200 hover:text-red-500"
                                        title="Eliminar filtro"
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Motor */}
                        <div className="relative flex flex-col gap-2">
                            <label htmlFor="motor" className="text-[16px] text-white max-sm:text-[14px]">
                                Motor
                            </label>
                            <div className="relative">
                                <select
                                    className="focus:outline-primary-orange w-full rounded-sm bg-white p-2 pr-10 text-sm outline-transparent transition duration-300 focus:outline max-sm:text-xs"
                                    name="motor"
                                    id="motor"
                                    value={data.motor}
                                    onChange={(e) => setData('motor', e.target.value)}
                                >
                                    <option value="">Elegir el motor</option>
                                    {motores.map((motorx) => (
                                        <option key={motorx.id} value={motorx.id}>
                                            {motorx.name}
                                        </option>
                                    ))}
                                </select>
                                {data.motor && (
                                    <button
                                        type="button"
                                        onClick={() => removeFilter('motor')}
                                        className="absolute top-1/2 right-5 -translate-y-1/2 transform text-gray-400 transition duration-200 hover:text-red-500"
                                        title="Eliminar filtro"
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Código Original */}
                        <div className="flex w-full flex-col gap-2">
                            <label htmlFor="codigo_original" className="text-[16px] text-white max-sm:text-[14px]">
                                Código
                            </label>
                            <div className="relative">
                                <input
                                    value={data.code}
                                    type="text"
                                    className="focus:outline-primary-orange w-full rounded-sm bg-white p-2 pr-10 text-sm outline-transparent transition duration-300 focus:outline max-sm:text-xs"
                                    id="codigo_original"
                                    name="code"
                                    placeholder="Ingrese código original"
                                    onChange={(e) => setData('code', e.target.value)}
                                />
                                {data.code && (
                                    <button
                                        type="button"
                                        onClick={() => removeFilter('code')}
                                        className="absolute top-1/2 right-5 -translate-y-1/2 transform text-gray-400 transition duration-200 hover:text-red-500"
                                        title="Eliminar filtro"
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Código Alternativo */}
                        <div className="flex w-full flex-col gap-2">
                            <label htmlFor="codigo_oem" className="text-[16px] text-white max-sm:text-[14px]">
                                Código alternativo
                            </label>
                            <div className="relative">
                                <input
                                    value={data.code_oem}
                                    type="text"
                                    className="focus:outline-primary-orange w-full rounded-sm bg-white p-2 pr-10 text-sm outline-transparent transition duration-300 focus:outline max-sm:text-xs"
                                    id="codigo_oem"
                                    name="code_oem"
                                    placeholder="Ingrese código sr33"
                                    onChange={(e) => setData('code_oem', e.target.value)}
                                />
                                {data.code_oem && (
                                    <button
                                        type="button"
                                        onClick={() => removeFilter('code_oem')}
                                        className="absolute top-1/2 right-5 -translate-y-1/2 transform text-gray-400 transition duration-200 hover:text-red-500"
                                        title="Eliminar filtro"
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Categoría */}
                        <div className="relative flex flex-col gap-2">
                            <label htmlFor="tipo" className="text-[16px] text-white max-sm:text-[14px]">
                                Categoría
                            </label>
                            <div className="relative">
                                <select
                                    className="focus:outline-primary-orange w-full rounded-sm bg-white p-2 pr-10 text-sm outline-transparent transition duration-300 focus:outline max-sm:text-xs"
                                    name="tipo"
                                    id="tipo"
                                    value={data.tipo}
                                    onChange={(e) => setData('tipo', e.target.value)}
                                >
                                    <option value="">Seleccionar categoria</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.name}
                                        </option>
                                    ))}
                                </select>
                                {data.tipo && (
                                    <button
                                        type="button"
                                        onClick={() => removeFilter('tipo')}
                                        className="absolute top-1/2 right-5 -translate-y-1/2 transform text-gray-400 transition duration-200 hover:text-red-500"
                                        title="Eliminar filtro"
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botón de búsqueda */}
                <div className="mt-4 flex h-full w-full flex-col items-center justify-end gap-2 lg:mt-0 lg:w-fit lg:items-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-primary-orange hover:bg-primary-orange-dark w-full min-w-[120px] rounded-sm px-6 py-2 text-[16px] font-semibold text-white transition duration-300 disabled:opacity-50 max-sm:min-w-[100px] max-sm:px-4 max-sm:py-1.5 max-sm:text-[14px] lg:w-auto"
                    >
                        {processing ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
