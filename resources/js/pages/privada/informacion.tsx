import { Head, useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import DefaultLayout from '../defaultLayout';

export default function Informacion() {
    const { informacion } = usePage().props;

    const { setData, post, processing } = useForm({
        fecha: '',
        importe: '',
        banco: '',
        sucursal: '',
        facturas: '',
        observaciones: '',
    });

    const sendInformacion = (e) => {
        e.preventDefault();
        post(route('sendInformacion'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Información enviada correctamente');
                setData({
                    fecha: '',
                    importe: '',
                    banco: '',
                    sucursal: '',
                    facturas: '',
                    observaciones: '',
                });
            },
            onError: () => {
                toast.error('Error al enviar la información');
            },
        });
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Información de pagos</title>
            </Head>
            <div className="mx-auto my-20 min-h-[50vh] w-[1200px] max-sm:mx-4 max-sm:my-10 max-sm:w-auto">
                <div className="flex flex-col gap-5">
                    <h2 className="text-[44px] font-semibold text-black max-sm:text-[28px]">Información de pagos</h2>
                    <div className="flex flex-row gap-2 max-sm:flex-col max-sm:gap-4">
                        <div className="flex w-full flex-col gap-2">
                            <h3 className="text-[16px] font-semibold max-sm:text-[14px]">Cuentas bancarias para efectuar el depósito:</h3>
                            <div dangerouslySetInnerHTML={{ __html: informacion?.informacion }} />
                        </div>
                        <div className="h-[568px] w-[808px] max-sm:h-auto max-sm:w-full">
                            <form
                                onSubmit={sendInformacion}
                                className="grid h-fit w-[808px] grid-cols-4 gap-6 bg-[#ECECEC] p-5 max-sm:w-full max-sm:grid-cols-1 max-sm:gap-4 max-sm:p-4"
                            >
                                <div className="col-span-2 flex flex-col gap-2 max-sm:col-span-1">
                                    <label htmlFor="fecha">Fecha</label>
                                    <input
                                        onChange={(e) => setData('fecha', e.target.value)}
                                        type="text"
                                        id="fecha"
                                        className="h-[45px] border border-[#4D565D] pl-2"
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col gap-2 max-sm:col-span-1">
                                    <label htmlFor="importe">Importe</label>
                                    <input
                                        onChange={(e) => setData('importe', e.target.value)}
                                        type="text"
                                        id="importe"
                                        className="h-[45px] border border-[#4D565D] pl-2"
                                    />
                                </div>

                                {/* Crear un contenedor que ocupe las 4 columnas para los 3 campos */}
                                <div className="col-span-4 grid grid-cols-3 gap-6 max-sm:col-span-1 max-sm:grid-cols-1 max-sm:gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="banco">Banco</label>
                                        <input
                                            onChange={(e) => setData('banco', e.target.value)}
                                            type="text"
                                            id="banco"
                                            className="h-[45px] border border-[#4D565D] pl-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="sucursal">Sucursal</label>
                                        <input
                                            onChange={(e) => setData('sucursal', e.target.value)}
                                            type="text"
                                            id="sucursal"
                                            className="h-[45px] border border-[#4D565D] pl-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="facturas">Facturas canceladas</label>
                                        <input
                                            onChange={(e) => setData('facturas', e.target.value)}
                                            type="text"
                                            id="facturas"
                                            className="h-[45px] border border-[#4D565D] pl-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-4 flex flex-col gap-2 max-sm:col-span-1">
                                    <label htmlFor="observaciones">Observaciones</label>
                                    <textarea
                                        onChange={(e) => setData('observaciones', e.target.value)}
                                        rows={6}
                                        id="observaciones"
                                        className="max-sm:rows-4 border border-[#4D565D] pl-2"
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-center gap-2 max-sm:col-span-1 w-[80%]">
                                    <label htmlFor="adjunto">Adjuntar archivos</label>
                                    <div className="flex h-[45px] flex-row items-center justify-between border border-[#4D565D] px-2 pl-2">
                                        <input onChange={(e) => setData('archivo', e.target.files[0])} type="file" id="adjunto" className="w-full" />
                                        <label htmlFor="adjunto" className="cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M2 16C1.45 16 0.979002 15.804 0.587002 15.412C0.195002 15.02 -0.000664969 14.5493 1.69779e-06 14V11H2V14H14V11H16V14C16 14.55 15.804 15.021 15.412 15.413C15.02 15.805 14.5493 16.0007 14 16H2ZM7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7Z" fill="#FF120B"/>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col justify-end gap-2 max-sm:col-span-1 max-sm:justify-start">
                                    <div className="flex flex-row items-end justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
                                        <p className="h-fit max-sm:text-sm">*Campos obligatorios</p>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-primary-orange h-[41px] w-[163px] rounded-sm font-bold text-white max-sm:w-full"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
