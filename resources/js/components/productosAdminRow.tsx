import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Switch from './Switch';

export default function ProductosAdminRow({ producto }) {
    const [edit, setEdit] = useState(false);

    const { categorias, modelos, marcas, motores } = usePage().props;

    const { data, setData, post, reset, errors } = useForm({
        order: producto?.order,
        name: producto?.name,
        code: producto?.code,
        code_oem: producto?.code_oem,
        destacado: producto?.destacado,
        nuevo: producto?.nuevo,
        oferta: producto?.oferta,
        descuento: producto?.descuento,
        medidas: producto?.medidas,
        precio: producto?.precio,
        categoria_id: producto?.categoria_id,
        marca_id: producto?.marca_id,
        unidad_pack: producto?.unidad_pack,
        modelos: producto?.modelos?.map((modelo) => modelo.modelo_id),
        motores: producto?.motores?.map((motor) => motor.motor_id),
        id: producto?.id,
    });

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.productos.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Producto actualizada correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar producto');
                console.log(errors);
            },
        });
    };

    const deleteMarca = () => {
        if (confirm('¿Estas seguro de eliminar este producto?')) {
            post(route('admin.productos.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Producto eliminada correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar producto');
                    console.log(errors);
                },
            });
        }
    };

    const [existingImages, setExistingImages] = useState(producto.imagenes || []);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [modeloSelected, setModeloSelected] = useState([]);
    const [motorSelected, setMotorSelected] = useState([]);

    useEffect(() => {
        setData(
            'modelos',
            modeloSelected.map((m) => m.value),
        );
        setData(
            'motores',
            motorSelected.map((m) => m.value),
        );
    }, [modeloSelected, motorSelected]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Actualizar el form data con los archivos nuevos
        setData('new_images', files);

        // Crear previews de las nuevas imágenes
        const previews = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) =>
                    resolve({
                        file: file,
                        url: e.target.result,
                        name: file.name,
                        size: file.size,
                        isNew: true,
                    });
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews).then(setNewImagePreviews);
    };

    const removeExistingImage = (indexToRemove) => {
        const imageToDelete = existingImages[indexToRemove];

        // Agregar al array de imágenes a eliminar
        setImagesToDelete((prev) => [...prev, imageToDelete.id]);

        // Remover de imágenes existentes
        const newExistingImages = existingImages.filter((_, index) => index !== indexToRemove);
        setExistingImages(newExistingImages);

        // Actualizar form data
        setData('images_to_delete', [...imagesToDelete, imageToDelete.id]);
    };

    const removeNewImage = (indexToRemove) => {
        const newImages = data.new_images?.filter((_, index) => index !== indexToRemove) || [];
        const newPreviews = newImagePreviews.filter((_, index) => index !== indexToRemove);

        setData('new_images', newImages);
        setNewImagePreviews(newPreviews);
    };

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="align-middle">{producto?.order}</td>
            <td className="align-middle">{producto?.code}</td>
            <td className="align-middle">{producto?.code_oem}</td>
            <td className="align-middle">{producto?.name}</td>
            <td className="align-middle">{producto?.categoria?.name}</td>
            <td className="h-[90px]">
                <Switch routeName="cambiarDestacado" id={producto?.id} status={producto?.destacado == 1} />
            </td>

            <td className="">
                <Switch routeName="cambiarNuevo" id={producto?.id} status={producto?.nuevo == 1} />
            </td>

            <td className="">
                <Switch routeName="cambiarOferta" id={producto?.id} status={producto?.oferta == 1} />
            </td>

            <td className="w-[140px] text-center">
                <div className="flex flex-row justify-center gap-3">
                    <button onClick={() => setEdit(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                    </button>
                    <button onClick={deleteMarca} className="h-10 w-10 rounded-md border border-red-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#fb2c36" />
                    </button>
                </div>
            </td>

            <AnimatePresence>
                {edit && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                    >
                        <form onSubmit={handleUpdate} method="POST" className="relative rounded-lg bg-white text-black">
                            <div className="bg-primary-orange sticky top-0 flex flex-row items-center gap-2 rounded-t-lg p-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ffffff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-plus-icon lucide-plus"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                                <h2 className="text-2xl font-semibold text-white">Actualizar Producto</h2>
                            </div>

                            <div className="max-h-[60vh] w-[500px] overflow-y-auto rounded-md bg-white p-4">
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="ordennn">Orden</label>
                                    <input
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="ordennn"
                                        id="ordennn"
                                        value={data.order}
                                        onChange={(e) => setData('order', e.target.value)}
                                    />
                                    <label htmlFor="nombree">Nombre</label>
                                    <input
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="nombree"
                                        id="nombree"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <label htmlFor="code">Codigo</label>
                                    <input
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="code"
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                    />

                                    <label htmlFor="code_oem">Codigo OEM</label>
                                    <input
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="code_oem"
                                        id="code_oem"
                                        value={data.code_oem}
                                        onChange={(e) => setData('code_oem', e.target.value)}
                                    />

                                    <label htmlFor="unidad">Unidad por pack</label>
                                    <input
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="number"
                                        name="unidad"
                                        id="unidad"
                                        value={data.unidad_pack}
                                        onChange={(e) => setData('unidad_pack', e.target.value)}
                                    />

                                    <label htmlFor="descuento">Descuento por oferta</label>
                                    <input
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="number"
                                        name="descuento"
                                        id="descuento"
                                        value={data.descuento}
                                        onChange={(e) => setData('descuento', e.target.value)}
                                    />

                                    <label htmlFor="medidas">Medidas</label>
                                    <input
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="medidas"
                                        id="medidas"
                                        value={data.medidas}
                                        onChange={(e) => setData('medidas', e.target.value)}
                                    />

                                    <label htmlFor="categoria">Categoria</label>
                                    <select
                                        value={data.categoria_id}
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        onChange={(e) => setData('categoria_id', e.target.value)}
                                        name=""
                                        id=""
                                    >
                                        <option value="">Seleccionar Tipo de producto</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="marca">Marcas</label>
                                    <select
                                        value={data.marca_id}
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        onChange={(e) => setData('marca_id', e.target.value)}
                                        name=""
                                        id=""
                                    >
                                        <option value="">Seleccionar marca</option>
                                        {marcas.map((marca) => (
                                            <option key={marca.id} value={marca.id}>
                                                {marca.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="modelo">Modelos</label>
                                    <Select
                                        options={modelos?.map((modelo) => ({
                                            value: modelo.id,
                                            label: modelo.name,
                                        }))}
                                        defaultValue={producto?.modelos
                                            ?.map((modelo) => modelo.modelo_id)
                                            ?.map((modeloId) => {
                                                const modelo = modelos?.find((m) => m.id == modeloId);
                                                return modelo ? { value: modelo.id, label: modelo.name } : null;
                                            })
                                            .filter(Boolean)}
                                        onChange={(options) => setModeloSelected(options)}
                                        className=""
                                        name="modelo"
                                        id="modelo"
                                        isMulti
                                    />

                                    <label htmlFor="motor">Motores</label>
                                    <Select
                                        options={motores?.map((motor) => ({
                                            value: motor.id,
                                            label: motor.name,
                                        }))}
                                        defaultValue={producto?.motores
                                            ?.map((motor) => motor.motor_id)
                                            ?.map((motorId) => {
                                                const motor = motores?.find((m) => m.id === motorId);
                                                return motor ? { value: motor.id, label: motor.name } : null;
                                            })
                                            .filter(Boolean)}
                                        onChange={(options) => setMotorSelected(options)}
                                        className=""
                                        name="motor"
                                        id="motor"
                                        isMulti
                                    />

                                    <label htmlFor="precio">Precio</label>
                                    <input
                                        className="focus:outline-primary-orange rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="number"
                                        name="precio"
                                        id="precio"
                                        value={data.precio}
                                        onChange={(e) => setData('precio', e.target.value)}
                                    />

                                    <label>Imágenes del Producto</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file:bg-primary-orange w-full rounded border p-2 file:cursor-pointer file:rounded-full file:px-4 file:py-2 file:text-white"
                                    />
                                    {errors.new_images && <span className="text-red-500">{errors.new_images}</span>}
                                    {errors['new_images.*'] && <span className="text-red-500">{errors['new_images.*']}</span>}

                                    {/* Mostrar imágenes existentes */}
                                    {existingImages.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <h4>Imágenes actuales ({existingImages.length})</h4>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                {existingImages.map((image, index) => (
                                                    <div key={image.id} className="relative">
                                                        <img
                                                            src={image.image || image.path} // Ajusta según tu estructura
                                                            alt={image.name || `Imagen ${index + 1}`}
                                                            className="h-32 w-full rounded border object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeExistingImage(index)}
                                                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                        <p className="mt-1 truncate text-xs text-gray-600">{image.name || `Imagen ${index + 1}`}</p>
                                                        <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                            Existente
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mostrar nuevas imágenes */}
                                    {newImagePreviews.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <h4>Nuevas imágenes ({newImagePreviews.length})</h4>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                {newImagePreviews.map((preview, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={preview.url}
                                                            alt={preview.name}
                                                            className="h-32 w-full rounded border object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeNewImage(index)}
                                                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                        <p className="mt-1 truncate text-xs text-gray-600">{preview.name}</p>
                                                        <p className="text-xs text-gray-500">{(preview.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        <span className="inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                                                            Nueva
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mostrar total de imágenes */}
                                    <div className="mt-2 text-sm text-gray-600">
                                        Total de imágenes: {existingImages.length + newImagePreviews.length}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary-orange sticky bottom-0 flex justify-end gap-4 rounded-b-md p-4">
                                <button
                                    type="button"
                                    onClick={() => setEdit(false)}
                                    className="rounded-md border border-red-500 bg-red-500 px-2 py-1 text-white transition duration-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="hover:text-primary-orange rounded-md px-2 py-1 text-white outline outline-white transition duration-300 hover:bg-white"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </tr>
    );
}
