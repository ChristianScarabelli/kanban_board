import AddButton from "./ui/AddButton";
import ModifyButton from "./ui/ModifyButton";
import DeleteButton from "./ui/DeleteButton";
import TaskCard from "./TaskCard";

import { useState, useContext } from "react";
import DotsMenu from "./ui/DotsMenu.jsx";

export default function TodoCard({ todo }) {

    return (
        <section>
            <div className="flex flex-col justify-start p-3 rounded-lg bg-gray-800 text-gray-400"
                onMouseEnter={() => setInHover(true)}
                onMouseLeave={() => setInHover(false)}
            >
                <h2>{todo.title}</h2>
                <DotsMenu />

                <section className="flex flex-col justify-start gap-3">
                    {todo.tasks && todo.tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </section>
            </div>
        </section>
    );
}