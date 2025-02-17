import { useContext, useEffect, useState } from "react";
import axios from "axios";

// Components
import TodoCard from "./TodoCard";
import AddButton from "./ui/AddButton";
import { GlobalContext } from "../contexts/GlobalContext";

export default function Main() {
    const { inputValue, setInputValue } = useContext(GlobalContext);
    const [todos, setTodos] = useState([]);

    // Fetch delle todos
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/todos");
                // console.log(response.data);
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
                <div className="w-64 self-start rounded-lg bg-gray-600 opacity-80 hover:bg-gray-100 hover:text-gray-300">
                    <AddButton data="Column" />
                </div>
                {todos && todos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
        </main>
    );
}