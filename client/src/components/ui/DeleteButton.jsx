import { TrashIcon } from "@heroicons/react/20/solid";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function DeleteButton({ onClick }) {
    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={200}>
                <Tooltip.Trigger asChild>
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center p-2 rounded-lg text-gray-200 hover:bg-red-700 relative"
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
                        Elimina
                        <Tooltip.Arrow className="fill-gray-700" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
