import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

// Components
import TodoCard from "./TodoCard";
import AddColumnButton from "./ui/AddColumnButton";
import TaskCard from "./TaskCard";
import { GlobalContext } from "../contexts/GlobalContext";
import Notify, { notifySuccess } from "./ui/Notify";

export default function Main() {
    const { setIsLoading } = useContext(GlobalContext);
    const [todos, setTodos] = useState([]); // Stato per memorizzare le colonne (todo)
    const [activeTask, setActiveTask] = useState(null); // Stato per memorizzare il task attivo durante il drag

    // Funzione per recuperare i todo dal server
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

    // Configurazione dei sensori per il drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Funzione chiamata all'inizio del drag
    const handleDragStart = (event) => {
        const { active } = event;
        const activeTask = active.id.split('-');
        const activeTodoId = parseInt(activeTask[1]);
        const activeTaskId = parseInt(activeTask[2]);
        const todo = todos.find(todo => todo.id === activeTodoId);
        const task = todo.tasks.find(task => task.id === activeTaskId);
        setActiveTask(task);
    };

    // Funzione chiamata alla fine del drag
    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        if (active.id !== over.id) {
            const activeTask = active.id.split('-');
            const overTask = over.id.split('-');

            const activeTodoId = parseInt(activeTask[1]);
            const activeTaskId = parseInt(activeTask[2]);
            const overTodoId = parseInt(overTask[1]);
            const overTaskId = parseInt(overTask[2]);

            if (activeTodoId === overTodoId) {
                // Spostamento all'interno della stessa colonna
                const todo = todos.find(todo => todo.id === activeTodoId);
                const activeIndex = todo.tasks.findIndex(task => task.id === activeTaskId);
                const overIndex = todo.tasks.findIndex(task => task.id === overTaskId);
                const newTasks = arrayMove(todo.tasks, activeIndex, overIndex);
                const newTodos = todos.map(todo => todo.id === activeTodoId ? { ...todo, tasks: newTasks } : todo);
                setTodos(newTodos);
                saveTodos(newTodos);
            } else {
                // Spostamento tra colonne diverse
                const sourceTodo = todos.find(todo => todo.id === activeTodoId);
                const destinationTodo = todos.find(todo => todo.id === overTodoId);

                const sourceIndex = sourceTodo.tasks.findIndex(task => task.id === activeTaskId);
                const [movedTask] = sourceTodo.tasks.splice(sourceIndex, 1);

                const targetIndex = destinationTodo.tasks.findIndex(task => task.id === overTaskId);
                destinationTodo.tasks.splice(targetIndex, 0, movedTask);

                const newTodos = todos.map(todo => {
                    if (todo.id === activeTodoId) {
                        return { ...todo, tasks: sourceTodo.tasks };
                    } else if (todo.id === overTodoId) {
                        return { ...todo, tasks: destinationTodo.tasks };
                    } else {
                        return todo;
                    }
                });

                setTodos(newTodos);
                saveTodos(newTodos);
            }
        }
    };

    // Funzione per salvare i todo aggiornati sul server
    const saveTodos = async (updatedTodos) => {
        try {
            await axios.put("http://localhost:3000/todos/reorder", { todos: updatedTodos });
        } catch (err) {
            console.error("Error saving the todos!", err);
        }
    };

    // Funzione per aggiungere una nuova colonna
    const handleAddColumn = () => {
        fetchTodos();
        notifySuccess('New Column added!');
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={todos.map(todo => `todo-${todo.id}`)}
                strategy={horizontalListSortingStrategy}
            >
                <main className="container mx-auto flex flex-col justify-center h-full overflow-x-auto overflow-y-hidden p-5">
                    <div className="grid grid-flow-col auto-cols-max gap-5 my-auto">
                        {todos && todos.map(todo => (
                            <SortableContext
                                key={todo.id}
                                items={todo.tasks.map(task => `task-${todo.id}-${task.id}`)}
                                strategy={verticalListSortingStrategy}
                            >
                                <TodoCard
                                    todo={todo}
                                    onAdd={fetchTodos}
                                    onDelete={fetchTodos}
                                    onModify={fetchTodos}
                                />
                            </SortableContext>
                        ))}
                        <div className="w-64 self-start rounded-lg bg-gray-600 opacity-80 hover:bg-gray-100 hover:text-gray-300">
                            <AddColumnButton onAdd={handleAddColumn} />
                        </div>
                    </div>
                </main>
            </SortableContext>
            <DragOverlay>
                {activeTask ? (
                    <TaskCard
                        task={activeTask}
                        taskId={activeTask.id}
                        toDoId={activeTask.todoId}
                        onDelete={() => { }}
                        onModify={() => { }}
                    />
                ) : null}
            </DragOverlay>
            <Notify className='bg-gray-800 text-gray-400' />
        </DndContext>
    );
}