import * as Tooltip from "@radix-ui/react-tooltip";
import { Check } from 'lucide-react';

export default function RadioButton({ checked, id, className }) {
    return (

        <Tooltip.Provider>
            <Tooltip.Root delayDuration={200}>
                <Tooltip.Trigger asChild>
                    <div
                        className={`w-4 h-4 border-2 rounded-full flex items-center justify-center cursor-pointer transition-all
                ${checked ? "border-green-600 bg-green-600" : "border-gray-700"}
                ${className || ""}`}
                    >
                        {/* passo il valore true con il flag altrimenti per il false non passo nulla così non renderizzo il numero 0 */}
                        {checked ? <Check className="text-white w-4 h-4" /> : null}
                    </div>
                </Tooltip.Trigger>

                <Tooltip.Portal>
                    <Tooltip.Content
                        side="top"
                        align="center"
                        className="bg-gray-700 text-white px-2 py-1 rounded-lg text-sm shadow-lg z-50"
                    >
                        Complete
                        <Tooltip.Arrow className="fill-gray-700" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}
