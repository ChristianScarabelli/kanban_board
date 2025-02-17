import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axios from "axios";

export default function AddButton({ data, onAdd }) {
    const [inputValue, setInputValue] = useState("");
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
        setInputValue("");
    };

    // Funzione per aggiungere una nuova colonna dal submit del form
    const newColumnSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/todos", { title: inputValue });
            setInputValue("");
            setIsClicked(false);
            // Chiamo la funzione onAdd durante la chiamata
            onAdd();
        } catch (err) {
            console.error("Error adding the new column!", err);
            setIsClicked(false);
            setInputValue("");
        }
    };

    return (
        <div className="w-full">
            {isClicked ? (
                <form onSubmit={newColumnSubmit} className="w-full">
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        autoCapitalize="off"
                        autoCorrect="off"
                        name={data}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="text-sm w-full p-3 rounded-lg text-gray-200 hover:text-gray-200 bg-gray-600"
                        placeholder={`Enter ${data} name`}
                        autoFocus
                    />
                </form>
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
