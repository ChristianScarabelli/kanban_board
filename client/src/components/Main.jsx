import { useEffect, useState } from "react";

import axios from "axios";
import TodoCard from "./TodoCard";


export default function Main() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/todos");
                console.log(response.data)
                setTodos(response.data);
            } catch (err) {
                console.error("Error fetching the todos!", err);
            }
        };

        fetchTodos();
    }, []);

    return (
        <main className="container mx-auto flex flex-col justify-center h-full overflow-x-auto overflow-y-hidden p-5">
            <div className="grid grid-flow-col auto-cols-max gap-5 my-auto">
                {todos && todos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
        </main>
    );
}