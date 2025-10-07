import { default as ProductosPrivadaRow } from '@/components/productosPrivadaRow';
import { Head, Link, useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DefaultLayout from '../defaultLayout';

//import PedidoTemplate from "../components/PedidoTemplate";
//import ProductRow from "../components/ProductRow";

export default function Carrito({
    informacion,
    auth,
    carrito,
    productos,
    subtotal,
    iva,
    descuento_uno,
    descuento_dos,
    descuento_tres,
    descuento,
    subtotal_descuento,
    total,
}) {
    const { user } = auth;

    const [selected, setSelected] = useState('Efectivo');
    const [tipo_entrega, setTipo_entrega] = useState('Efectivo');

    const [selectedEnvio, setSelectedEnvio] = useState('retiro');
    const [tipo_entrega_envio, setTipo_entrega_envio] = useState('retiro');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);
    const [succID, setSuccID] = useState();

    const pedidoForm = useForm({
        tipo_entrega: tipo_entrega_envio,
        forma_pago: tipo_entrega,
        subtotal: subtotal,
        descuento: descuento,
        iva: iva,
        total: total,
        user_id: user?.id,
    });

    useEffect(() => {
        // Reset form data when component mounts
        pedidoForm.setData({
            tipo_entrega: tipo_entrega_envio,
            forma_pago: tipo_entrega,
            subtotal: subtotal,
            descuento: descuento,
            iva: iva,
            total: total,
            user_id: user?.id,
        });
    }, [tipo_entrega_envio, tipo_entrega, subtotal, descuento, iva, total, user?.id]);

    const hacerPedido = () => {
        pedidoForm.post(route('hacerPedido'), {
            forceFormData: true,
            onSuccess: (response) => {
                console.log('Pedido realizado con éxito:', response);

                setSucc(true);
                setSuccID(response.props.flash.pedido_id);
                setIsSubmitting(false);
            },
            onError: (error) => {
                setError(true);
                setIsSubmitting(false);
                console.error('Error al hacer el pedido:', error);
            },
        });
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Carrito</title>
            </Head>
            <div className="mx-auto grid w-[1200px] grid-cols-2 gap-10 py-20 max-sm:w-full max-sm:px-4">
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-10 left-[45%] rounded-lg bg-red-500 p-3 text-white"
                        >
                            <p>Error al enviar el pedido</p>
                        </motion.div>
                    )}
                    {succ && (
                        <div>
                            <div className="fixed top-0 left-0 h-screen w-screen bg-black opacity-50"></div>
                            <div className="fixed top-1/2 left-1/2 flex h-[343px] w-[642px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-evenly bg-white text-black shadow-lg">
                                <h1 className="text-[32px] font-bold">Pedido confirmado</h1>
                                <div className="flex flex-col items-center gap-8">
                                    <p className="w-[90%] text-center text-[#515A53]">
                                        Su pedido #{succID} está en proceso y te avisaremos por email cuando esté listo. Si tienes alguna pregunta, no
                                        dudes en contactarnos.
                                    </p>
                                    <Link
                                        href={'/privada/productos'}
                                        className="flex h-[47px] w-[253px] items-center justify-center bg-black text-white"
                                    >
                                        VOLVER A PRODUCTOS
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

                <div className="col-span-2 grid w-full items-start">
                    <div className="w-full">
                        <div className="grid h-[52px] grid-cols-9 items-center rounded-t-sm bg-black text-white max-sm:hidden max-sm:h-[40px] max-sm:grid-cols-4 max-sm:text-[12px]">
                            <p className="max-sm:hidden"></p>
                            <p className="max-sm:hidden">Código</p>
                            <p>Marca</p>
                            <p className="">Categoria</p>
                            <p className="text-center max-sm:hidden">Precio</p>
                            <p className="text-center max-sm:hidden">Descuentos</p>
                            <p className="text-center max-sm:hidden">Precio con descuento</p>
                            <p className="text-center max-sm:hidden">Cantidad</p>
                            <p className="text-center max-sm:hidden"></p>
                            <p></p>
                        </div>
                        {productos?.map((producto) => <ProductosPrivadaRow key={producto?.id} producto={producto} />)}
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="">
                        <Link
                            href={'/privada/productos'}
                            className="border-primary-orange text-primary-orange h-[47px] rounded-sm border px-5 py-2 font-semibold transition duration-300 hover:bg-black hover:text-white"
                        >
                            Agregar productos
                        </Link>
                    </div>
                </div>

                <div className="h-[206px] border max-sm:order-1 max-sm:col-span-2">
                    <div className="bg-black text-white">
                        <h2 className="p-3 text-xl font-bold">Informacion importante</h2>
                    </div>
                    <div
                        className="p-5"
                        dangerouslySetInnerHTML={{
                            __html: informacion?.text,
                        }}
                    ></div>
                </div>

                <div className="h-fit w-full border max-sm:order-3 max-sm:col-span-2">
                    <div className="bg-black p-3 text-white">
                        <h2 className="text-xl font-bold">Entrega</h2>
                    </div>

                    <div className="flex h-fit w-full flex-col justify-center gap-4 py-4 text-[18px] text-[#74716A]">
                        {/* Opción: Retiro Cliente */}
                        <div
                            className={`flex cursor-pointer items-center justify-between rounded-lg pl-3`}
                            onClick={() => {
                                setSelectedEnvio('retiro');
                                setTipo_entrega_envio('retiro cliente');
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-5 w-5 rounded-full border-2 ${
                                        selectedEnvio === 'retiro' ? 'border-primary-orange flex items-center justify-center' : 'border-gray-400'
                                    }`}
                                >
                                    {selectedEnvio === 'retiro' && <div className="bg-primary-orange h-[10px] w-[10px] rounded-full"></div>}
                                </div>
                                <label className="cursor-pointer">Retiro cliente</label>
                            </div>
                        </div>

                        <div
                            className={`flex cursor-pointer items-center justify-between rounded-lg pl-3`}
                            onClick={() => {
                                setSelectedEnvio('Reparto SGB / Transporte interior del país');
                                setTipo_entrega_envio('Reparto SGB / Transporte interior del país');
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-5 w-5 rounded-full border-2 ${
                                        selectedEnvio === 'Reparto SGB / Transporte interior del país'
                                            ? 'border-primary-orange flex items-center justify-center'
                                            : 'border-gray-400'
                                    }`}
                                >
                                    {selectedEnvio === 'Reparto SGB / Transporte interior del país' && (
                                        <div className="bg-primary-orange h-[10px] w-[10px] rounded-full"></div>
                                    )}
                                </div>
                                <label className="cursor-pointer">Reparto SGB / Transporte interior del país</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex h-[206px] flex-col gap-3 max-sm:order-2 max-sm:col-span-2">
                    <div className="">
                        <h2 className="text-xl font-bold">Escribinos un mensaje</h2>
                    </div>
                    <textarea
                        onChange={(e) => {
                            pedidoForm.setData('mensaje', e.target.value);
                        }}
                        className="h-[222px] w-full border p-3"
                        name=""
                        id=""
                        rows={10}
                        placeholder="Dias especiales de entrega, cambios de domicilio, expresos, requerimientos especiales en la mercaderia, exenciones."
                    ></textarea>
                </div>

                <div className="h-fit w-full border max-sm:order-3 max-sm:col-span-2">
                    <div className="bg-black p-3">
                        <h2 className="text-xl font-bold text-white">Formas de pago</h2>
                    </div>

                    <div className="flex h-fit w-full flex-col justify-center gap-4 py-4 text-[18px] text-[#74716A]">
                        {/* Opción: Retiro Cliente */}
                        <div
                            className={`flex cursor-pointer items-center justify-between rounded-lg pl-3`}
                            onClick={() => {
                                setSelected('Efectivo');
                                setTipo_entrega('Efectivo');
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-5 w-5 rounded-full border-2 ${
                                        selected === 'Efectivo' ? 'border-primary-orange flex items-center justify-center' : 'border-gray-400'
                                    }`}
                                >
                                    {selected === 'Efectivo' && <div className="bg-primary-orange h-[10px] w-[10px] rounded-full"></div>}
                                </div>
                                <label className="cursor-pointer">Efectivo</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 max-sm:order-4 max-sm:col-span-2">
                    <h2 className="text-2xl font-bold">Adjuntar un archivo</h2>
                    <div className="flex w-full items-center justify-between border">
                        <span className="pl-4 text-gray-600">{pedidoForm?.data?.archivo?.name}</span>
                        <label
                            htmlFor="fileInput"
                            className="text-primary-orange h-full cursor-pointer bg-gray-100 p-4 font-semibold hover:bg-gray-200"
                        >
                            ADJUNTAR
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={(e) => {
                                pedidoForm.setData('archivo', e.target.files[0]);
                            }}
                        />
                    </div>
                </div>

                <div className="h-fit border max-sm:order-5 max-sm:col-span-2">
                    <div className="bg-black text-white">
                        <h2 className="p-3 text-xl font-bold">Pedido</h2>
                    </div>

                    <div className="flex flex-col justify-between gap-4 border-b px-4 py-4 text-xl text-[18px] text-black">
                        <div className="flex w-full flex-row justify-between">
                            <p>Subtotal</p>
                            <p>
                                ${' '}
                                {Number(subtotal)?.toLocaleString('es-AR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>

                        {subtotal_descuento != subtotal && (
                            <div className="flex w-full flex-row justify-between">
                                <p className="text-center text-green-500">
                                    Descuento{' '}
                                    {[user?.descuento_uno, user?.descuento_dos, user?.descuento_tres]
                                        .filter(Boolean)
                                        .map((descuento) => descuento + '%')
                                        .join(' + ')}
                                </p>
                                <p className="text-green-500">
                                    -${' '}
                                    {Number(descuento)?.toLocaleString('es-AR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                            </div>
                        )}

                        <div className="flex w-full flex-row justify-between">
                            <p>IVA 21%</p>
                            <p>
                                ${' '}
                                {Number(iva)?.toLocaleString('es-AR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between p-3">
                        <p className="text-2xl font-medium">
                            Total <span className="text-base">{'(IVA incluido)'}</span>
                        </p>
                        <p className="text-2xl">
                            ${' '}
                            {Number(total)?.toLocaleString('es-AR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                </div>
                <div></div>
                <div className="flex w-full flex-row items-end gap-3 max-sm:order-6 max-sm:col-span-2">
                    <Link
                        href={route('destroy')}
                        method="post"
                        className="border-primary-orange text-primary-orange flex h-[47px] w-full items-center justify-center rounded-sm border transition-transform hover:scale-95"
                    >
                        Cancelar pedido
                    </Link>
                    <button
                        disabled={pedidoForm.processing}
                        onClick={hacerPedido}
                        className={`h-[47px] w-full rounded-sm text-white transition-transform hover:scale-95 ${pedidoForm.processing ? 'bg-gray-400' : 'bg-primary-orange'}`}
                    >
                        {pedidoForm.processing ? 'Enviando pedido...' : 'Realizar pedido'}
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
}
