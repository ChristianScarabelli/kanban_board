import { useContext, useEffect, useState } from "react";
import axios from "axios";

// Components
import TodoCard from "./TodoCard";
import AddColumnButton from "./ui/AddColumnButton";
import { GlobalContext } from "../contexts/GlobalContext";
import Notify, { notifySuccess } from "./ui/Notify";

export default function Main() {
    const { setIsLoading } = useContext(GlobalContext);
    const [todos, setTodos] = useState([]);
    const [draggedTask, setDraggedTask] = useState(null);

    const fetchTodos = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/todos");
            setTodos(response.data);
        } catch (err) {
            console.error("Error fetching the todos!", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleDragStart = (task, todoId) => {
        setDraggedTask({ task, todoId });
    };

    const handleDrop = (targetTodoId, targetTaskId) => {
        if (!draggedTask) return;

        const { task: draggedTaskData, todoId: sourceTodoId } = draggedTask;

        if (sourceTodoId === targetTodoId) {
            const todo = todos.find(todo => todo.id === sourceTodoId);
            const sourceIndex = todo.tasks.findIndex(task => task.id === draggedTaskData.id);
            const targetIndex = todo.tasks.findIndex(task => task.id === targetTaskId);
            const newTasks = [...todo.tasks];
            const [movedTask] = newTasks.splice(sourceIndex, 1);
            newTasks.splice(targetIndex, 0, movedTask);
            const newTodos = todos.map(todo => todo.id === sourceTodoId ? { ...todo, tasks: newTasks } : todo);
            setTodos(newTodos);
        } else {
            const sourceTodo = todos.find(todo => todo.id === sourceTodoId);
            const destinationTodo = todos.find(todo => todo.id === targetTodoId);

            const sourceIndex = sourceTodo.tasks.findIndex(task => task.id === draggedTaskData.id);
            const [movedTask] = sourceTodo.tasks.splice(sourceIndex, 1);

            const targetIndex = destinationTodo.tasks.findIndex(task => task.id === targetTaskId);
            destinationTodo.tasks.splice(targetIndex, 0, movedTask);

            const newTodos = todos.map(todo => {
                if (todo.id === sourceTodoId) {
                    return { ...todo, tasks: sourceTodo.tasks };
                } else if (todo.id === targetTodoId) {
                    return { ...todo, tasks: destinationTodo.tasks };
                } else {
                    return todo;
                }
            });

            setTodos(newTodos);
        }

        setDraggedTask(null);
    };

    const handleAddColumn = () => {
        fetchTodos();
        notifySuccess('New Column added!');
    };

    return (
        <main className="container mx-auto flex flex-col justify-center h-full overflow-x-auto overflow-y-hidden p-5">
            <div className="grid grid-flow-col auto-cols-max gap-5 my-auto">
                {todos && todos.map(todo => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onAdd={fetchTodos}
                        onDelete={fetchTodos}
                        onModify={fetchTodos}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    />
                ))}
                <div className="w-64 self-start rounded-lg bg-gray-600 opacity-80 hover:bg-gray-100 hover:text-gray-300">
                    <AddColumnButton onAdd={handleAddColumn} />
                </div>
            </div>
            <Notify className='bg-gray-800 text-gray-400' />
        </main>
    );
}