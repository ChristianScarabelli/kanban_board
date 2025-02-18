import * as Tooltip from "@radix-ui/react-tooltip";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export default function ModifyButton({ onClick }) {
    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={200}>
                <Tooltip.Trigger asChild>
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center p-2 rounded-lg text-gray-200 hover:bg-blue-500 relative"
                    >
                        <PencilSquareIcon className="h-5 w-5" />
                    </button>
                </Tooltip.Trigger>

                <Tooltip.Portal>
                    <Tooltip.Content
                        side="top"
                        align="center"
                        className="bg-gray-700 text-white px-2 py-1 rounded-lg text-sm shadow-lg z-50"
                    >
                        Modify
                        <Tooltip.Arrow className="fill-gray-700" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
