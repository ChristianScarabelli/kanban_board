import { useContext, useEffect, useState } from "react";
import axios from "axios";

// Components
import TodoCard from "./TodoCard";
import AddColumnButton from "./ui/AddColumnButton";
import { GlobalContext } from "../contexts/GlobalContext";
import Notify, { notifySuccess } from "./ui/Notify";
export default function Main() {

    const { setIsLoading } = useContext(GlobalContext)

    const [todos, setTodos] = useState([]);

    // Fetch delle todos
    const fetchTodos = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/todos");
            setTodos(response.data);
        } catch (err) {
            console.error("Error fetching the todos!", err);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Funzione wrapper per onAdd con più funzioni
    const handleAddColumn = () => {
        fetchTodos();
        notifySuccess('New Column added!');
    };

    return (
        <main className="container mx-auto flex flex-col justify-center h-full overflow-x-auto overflow-y-hidden p-5">
            <div className="grid grid-flow-col auto-cols-max gap-5 my-auto">
                {todos && todos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} onAdd={fetchTodos} onDelete={fetchTodos} onModify={fetchTodos} />
                ))}
                <div className="w-64 self-start rounded-lg bg-gray-600 opacity-80 hover:bg-gray-100 hover:text-gray-300">
                    <AddColumnButton onAdd={handleAddColumn} />
                </div>
            </div>
            <Notify className='bg-gray-800 text-gray-400' />
        </main>
    );
}