import * as Tooltip from "@radix-ui/react-tooltip";
import { Check } from 'lucide-react';
import { useState } from "react";
import axios from "axios";

export default function RadioButton({ checked, className, taskId, toDoId, onCompletedChange }) {
    const [radioChecked, setRadioChecked] = useState(checked);

    // Funzione per gestire il click
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:3000/todos/${toDoId}/tasks/${taskId}`, { completed: !radioChecked });
            setRadioChecked(!radioChecked);
            onCompletedChange(!radioChecked); // Chiamata alla funzione di callback
        } catch (err) {
            console.error("Error completing the task!", err);
        }
    };

    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={200}>
                <Tooltip.Trigger asChild>
                    <div
                        onClick={handleClick}
                        className={`w-4 h-4 border-2 rounded-full flex items-center justify-center cursor-pointer transition-all
                        ${radioChecked ? "border-green-600 bg-green-600" : "border-gray-700"}
                        ${className || ""}`}
                    >
                        {radioChecked ? <Check className="text-white w-4 h-4" /> : null}
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
    );
}