import axios from "axios";
import { useState } from "react";

// Components
import AddTaskButton from "./ui/AddTaskButton";
import TaskCard from "./TaskCard";
import DotsMenu from "./ui/DotsMenu";

export default function TodoCard({ todo, onAdd, onDelete, onModify }) {

    // Stato per la modifica
    const [isEditing, setIsEditing] = useState(false);
    // stato per settare il nuovo title
    const [newTitle, setNewTitle] = useState(todo.title);

    // Funzione per gestire la modifica
    const handleModify = () => {
        setIsEditing(true);
    }

    // Funzione di submit della modifica
    const modifyTitle = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/todos/${todo.id}`, { title: newTitle });
            onModify();
            setIsEditing(false);
        } catch (err) {
            console.error("Error modifying the todo!", err);
        }
    };
    return (
        <section className="w-72">
            <div className="flex flex-col justify-start p-3 rounded-lg bg-gray-800 text-gray-400 max-h-140 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                    {isEditing ? (
                        <form onSubmit={modifyTitle} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="bg-gray-700 text-gray-200 p-2 rounded-lg"
                                autoFocus
                            />
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
                        </form>
                    ) : (
                        <h2>{todo.title}</h2>
                    )}
                    <DotsMenu toDoId={todo.id} onDelete={onDelete} onModify={handleModify} className='text-gray-200 hover:bg-gray-600 hover:opacity-80' />
                </div>
                <section className="flex flex-col justify-start gap-3 overflow-y-auto max-h-110">
                    {todo.tasks && todo.tasks.map(task => (
                        <TaskCard key={task.id} task={task} taskId={task.id} toDoId={todo.id} onDelete={onDelete} onModify={onModify} />
                    ))}
                </section>
                <div className="mt-3">
                    <AddTaskButton columnId={todo.id} onAdd={onAdd} />
                </div>
            </div>
        </section>
    );
}