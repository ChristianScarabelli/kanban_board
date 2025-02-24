import { TrashIcon } from "@heroicons/react/20/solid";
import * as Tooltip from "@radix-ui/react-tooltip";
import axios from "axios";
import { notifySuccess } from './Notify'

export default function DeleteButton({ toDoId, taskId, onDelete }) {

    // Funzione per elimnare le column o le task (in base all'url)
    const deleteItem = async (e) => {
        e.preventDefault();
        try {
            let url = `http://localhost:3000/todos/${toDoId}`
            if (taskId) {
                url += `/tasks/${taskId}`
            }
            const response = await axios.delete(url)
            // chiamo la funzione di eliminazione nella chiamata
            onDelete()
            notifySuccess('Deleted successfully!')
        }
        catch (err) {
            console.error("Error on deleting!", err);
        }
    }

    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={200}>
                <Tooltip.Trigger asChild>
                    <button
                        onClick={deleteItem}
                        className="cursor-pointer flex items-center justify-center p-2 rounded-lg text-gray-200 hover:bg-red-700 relative"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        side="top"
                        align="center"
                        className="bg-gray-700 text-white px-2 py-1 rounded-lg text-sm shadow-lg animate-fade-in z-50"
                    >
                        Delete
                        <Tooltip.Arrow className="fill-gray-700" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
