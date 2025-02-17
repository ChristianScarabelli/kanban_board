import { useState, useContext } from "react";

// Components
import AddButton from "./ui/AddButton";
import TaskCard from "./TaskCard";
import DotsMenu from "./ui/DotsMenu";

export default function TodoCard({ todo, onAdd }) {
    return (
        <section className="min-w-[16rem] max-w-[20rem]">
            <div className="flex flex-col justify-start p-3 rounded-lg bg-gray-800 text-gray-400">
                <div className="flex justify-between items-center mb-3">
                    <h2>{todo.title}</h2>
                    <DotsMenu className='text-gray-200 hover:bg-gray-600 hover:opacity-80' />
                </div>
                <section className="flex flex-col justify-start gap-3 overflow-y-auto max-h-110">
                    {todo.tasks && todo.tasks.map(task => (
                        <TaskCard key={task.id} task={task} id={task.id} />
                    ))}
                </section>
                <div className="mt-3">
                    {/* onAdd={funzione per aggiungere task }  */}
                    <AddButton data='Task' />
                </div>
            </div>
        </section>
    );
}