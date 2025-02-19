import { PlusIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function AddTaskButton({ columnId, onAdd }) {

    const { errorMessage, setErrorMessage } = useContext(GlobalContext)

    const initialFormData = {
        description: "",
        priority: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isClicked, setIsClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Funzione per gestire il click
    const handleClick = (e) => {
        e.preventDefault();
        setIsClicked(true);
        setIsOpen(true);
    };

    // Funzione per aggiornare l'input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Funzione per chiudere il form
    const handleCancelClick = () => {
        setIsOpen(false);
        setTimeout(() => {
            setIsClicked(false);
            setFormData(initialFormData);
            setErrorMessage('')
        }, 300); // Durata dell'animazione in uscita
    };

    // Funzione per aggiungere una nuova task dal submit del form
    const newTaskSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting new task:", formData);

        // Validazione se la description è vuota o contiene solo spazi
        if (!formData.description.trim()) {
            setErrorMessage("Description cannot be empty!");
            return
        }

        try {
            const response = await axios.post(`http://localhost:3000/todos/${columnId}/tasks`, {
                ...formData,
                priority: formData.priority ? parseInt(formData.priority) : null,
            });

            setFormData(initialFormData);
            setIsClicked(false);
            setIsOpen(false);
            // Chiamo la funzione onAdd durante la chiamata
            onAdd();
        } catch (err) {
            console.error("Error adding the new task!", err);
            setIsClicked(false);
            setFormData(initialFormData);
            setIsOpen(false);
        }
    };

    return (
        <div className="w-auto">
            {isClicked ? (
                <form onSubmit={newTaskSubmit} className={`${!isOpen && 'animate__fadeOutUp'} animate__animated animate__fadeInDown animate__faster flex flex-col p-2 py-3 rounded-lg mt-5 bg-gray-700`}>
                    <textarea
                        autoComplete="off"
                        spellCheck="false"
                        autoCapitalize="off"
                        autoCorrect="off"
                        rows='2'
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="text-sm p-3 rounded-lg text-gray-200 hover:text-gray-200 bg-gray-600"
                        placeholder="Enter Task description"
                        autoFocus
                        required
                    />
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="text-sm p-3 rounded-lg text-gray-200 hover:text-gray-200 bg-gray-600 mt-3"
                    >
                        <option value="">Select Priority</option>
                        <option value="3">Low</option>
                        <option value="2">Medium</option>
                        <option value="1">High</option>
                    </select>
                    <div className="flex gap-2 mt-3">
                        <button type="submit" className="text-sm cursor-pointer p-2 rounded-lg text-gray-200 bg-blue-500 hover:bg-blue-700">Add Task</button>
                        <button type="button" onClick={handleCancelClick} className="text-sm cursor-pointer p-2 rounded-lg text-gray-200 bg-red-600 hover:bg-red-700">Cancel</button>
                    </div>
                    <span className="mt-3 text-sm">{errorMessage}</span>
                </form>
            ) : (
                <button
                    onClick={handleClick}
                    className="cursor-pointer w-full flex items-center justify-start gap-2 p-3 rounded-lg text-gray-200 hover:bg-gray-600 hover:opacity-80"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span className="text-sm">Add Task</span>
                </button>
            )}
        </div>
    );
}