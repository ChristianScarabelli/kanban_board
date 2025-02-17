import { PlusIcon } from "@heroicons/react/20/solid";

export default function AddButton({ onClick, data }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-start gap-2 p-3 rounded-lg text-gray-200 hover:bg-gray-600 hover:opacity-80"
        >
            <PlusIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Add {data}</span>
        </button>
    );
}
