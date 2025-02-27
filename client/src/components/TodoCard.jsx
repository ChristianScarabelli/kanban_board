import axios from "axios";
import { useContext, useState } from "react";

// Components
import AddTaskButton from "./ui/AddTaskButton";
import TaskCard from "./TaskCard";
import DotsMenu from "./ui/DotsMenu";
import { GlobalContext } from "../contexts/GlobalContext";
import { notifySuccess } from './ui/Notify.jsx'

export default function TodoCard({ todo, onAdd, onDelete, onModify, onDragStart, onDrop }) {
    const { animationClass, setAnimationClass } = useContext(GlobalContext);

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleModify = () => {
        setIsEditing(true);
        setAnimationClass('animate__bounceInDown');
    };

    const modifyTitle = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/todos/${todo.id}`, { title: newTitle });
            onModify();
            setIsEditing(false);
            notifySuccess('Title modified!')
        } catch (err) {
            console.error("Error modifying the todo!", err);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetTaskId) => {
        e.preventDefault();
        onDrop(todo.id, targetTaskId);
    };

    return (
        <section className="w-72 animate__animated animate__fadeInDown animate__faster">
            <div className="flex flex-col justify-start p-3 rounded-lg bg-gray-800 text-gray-400 max-h-140 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                    {isEditing ? (
                        <form onSubmit={modifyTitle} className={`${animationClass} flex flex-col w-full gap-3 animate__animated  todo_modify_form_animation`}>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="bg-gray-700 text-gray-200 p-2 rounded-lg"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="text-sm cursor-pointer p-2 rounded-lg text-gray-200 bg-blue-500 hover:bg-blue-700">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="text-sm cursor-pointer p-2 rounded-lg text-gray-200 bg-red-600 hover:bg-red-700">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <h2>{todo.title}</h2>
                    )}
                    {!isEditing &&
                        <DotsMenu toDoId={todo.id} onDelete={onDelete} onModify={handleModify} className='text-gray-200 hover:bg-gray-600 hover:opacity-80' />
                    }
                </div>
                <div className="flex flex-col justify-start gap-3 overflow-y-auto max-h-110" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, null)}>
                    {todo.tasks && todo.tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            taskId={task.id}
                            toDoId={todo.id}
                            onDelete={onDelete}
                            onModify={onModify}
                            onDragStart={onDragStart}
                            onDrop={handleDrop}
                        />
                    ))}
                </div>
                <div className="mt-3">
                    <AddTaskButton columnId={todo.id} onAdd={onAdd} />
                </div>
            </div>
        </section>
    );
}