import NewsletterRow from '@/components/NewsletterRow';
import Dashboard from '@/pages/admin/dashboard';
import { usePage } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';

export default function NewsletterAdmin() {
    const suscribers = usePage().props.subscribers;


    return (
        <Dashboard>
            <div className="flex h-screen flex-col items-center gap-4 p-6">
                <Toaster />
                <div className="border-primary-orange flex w-full flex-row justify-between border-b-2 py-1">
                    <h2 className="border-primary-orange text-primary-orange text-bold w-full text-2xl">Suscriptores</h2>
                </div>

                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="w-[200px] px-6 py-3 text-center">
                                Mails
                            </th>
                            <th scope="col" className="w-[15%] px-6 py-3 text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {suscribers.map((info) => (
                            <NewsletterRow key={info.id} suscriberObject={info} />
                        ))}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
}
