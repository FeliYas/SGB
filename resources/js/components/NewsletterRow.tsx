import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function NewsletterRow({ suscriberObject }) {

    const deleteSuscriber = () => {
        console.log(suscriberObject?.id);
        router.delete(route('admin.newsletter.destroy', suscriberObject?.id), {
            onSuccess: () => {
                toast.success("Suscriptor eliminado correctamente");
            },
            onError: (errors) => {
                toast.error("Error al eliminar el suscriptor");
            },
        });
    }

    

    return (
        <>
            <tr
                className={`border-b  h-[134px] text-black ${
                    suscriberObject?.id % 2 === 0 ? "bg-gray-200" : "bg-white"
                }`}
            >
                <td className="px-6 py-4 font-medium text-black whitespace-nowrap  max-w-[340px] overflow-x-auto text-center">
                    {suscriberObject.email}
                </td>
                <td className="text-center">
                    <div className="flex flex-row gap-3 justify-center">
                        <button
                        type="button"
                            onClick={deleteSuscriber}
                            className="border-[#bc1d31] border py-1 px-2 text-white rounded-md w-10 h-10"
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                size="lg"
                                color="#bc1d31"
                            />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}