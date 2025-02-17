import { Check } from 'lucide-react';

export default function RadioButton({ checked, id, className }) {
    return (
        <div
            className={`w-4 h-4 border-2 rounded-full flex items-center justify-center cursor-pointer transition-all
                ${checked ? "border-green-600 bg-green-600" : "border-gray-400"}
                ${className || ""}`}
        >
            {checked ? <Check className="text-white w-4 h-4" /> : null}
        </div>
    );
}
