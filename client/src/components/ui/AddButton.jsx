import { PlusIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function AddButton({ data }) {
    const { inputValue, setInputValue } = useContext(GlobalContext);
    const [isClicked, setIsClicked] = useState(false);

    // Funzione per gestire il click
    const handleClick = (e) => {
        e.preventDefault();
        setIsClicked(true);
    };

    // Funzione per aggiornare l'input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Funzione per gestire la perdita di focus dell'input
    const handleInputBlur = () => {
        setIsClicked(false);
        // Logica per aggiungere la nuova colonna con il titolo `inputValue`
        console.log("New column title:", inputValue);
    };

    return (
        <div className="w-full">
            {isClicked ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="text-sm w-full p-3 rounded-lg text-gray-200 hover:text-gray-700, bg-gray-600"
                    placeholder={`Enter ${data} name`}
                    autoFocus
                />
            ) : (
                <button
                    onClick={handleClick}
                    className="cursor-pointer w-full flex items-center justify-start gap-2 p-3 rounded-lg text-gray-200 hover:bg-gray-600 hover:opacity-80"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">Add {data}</span>
                </button>
            )}
        </div>
    );
}
