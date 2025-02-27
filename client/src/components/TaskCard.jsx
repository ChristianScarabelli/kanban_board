import { useContext, useState } from 'react';
import axios from "axios";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GlobalContext } from '../contexts/GlobalContext.jsx';

// Components
import DotsMenu from '../components/ui/DotsMenu.jsx';
import RadioButton from './ui/RadioButton.jsx';
import { notifySuccess } from './ui/Notify.jsx';
import { ArrowsPointingOutIcon as DragIcon } from "@heroicons/react/20/solid";

export default function TaskCard({ task, taskId, toDoId, onDelete, onModify }) {
    const { description, priority } = task;
    const { animationClass } = useContext(GlobalContext);

    const [isHoveredTask, setIsHoveredTask] = useState(false); // Stato per gestire l'hover sulla task
    const [completed, setCompleted] = useState(task.completed === 1 ? task.completed : ''); // Stato per gestire il completamento della task
    const [isEditing, setIsEditing] = useState(false); // Stato per gestire la modalità di modifica della task
    const [taskData, setTaskData] = useState({ description, priority }); // Stato per memorizzare i dati della task

    // Funzione per gestire il cambiamento dei dati della task
    const handleTaskDataChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: name === 'priority' ? parseInt(value) : value
        });
    };

    // Funzione per modificare la task
    const modifyTask = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/todos/${toDoId}/tasks/${taskId}`, taskData);
            onModify();
            setIsEditing(false);
            notifySuccess('Task modified!');
        } catch (err) {
            console.error("Error modifying the task!", err);
        }
    };

    // Funzione per attivare la modalità di modifica della task
    const handleModifyClick = () => {
        setIsEditing(true);
    };

    // Funzione per annullare la modifica della task
    const handleCancelClick = () => {
        setIsEditing(false);
    };

    // Funzione per ottenere il colore della priorità
    const getPriorityColor = (priority) => {
        if (priority == null) {
            return 'bg-gray-200';
        }
        switch (priority) {
            case 1:
                return 'bg-red-600';
            case 2:
                return 'bg-orange-400';
            case 3:
                return 'bg-green-600';
            default:
                return 'bg-gray-200';
        }
    };

    const priorityColor = getPriorityColor(priority);

    // Funzione per gestire il cambiamento dello stato di completamento della task
    const handleCompletedChange = (newCompleted) => {
        setCompleted(newCompleted);
    };

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: `task-${toDoId}-${taskId}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <section
            ref={setNodeRef}
            style={style}
            className={`${isEditing && 'bg-gray-600'} flex flex-col bg-gray-200 rounded-lg text-gray-800 animate__animated animate__fadeInDown animate__faster`}
            onMouseEnter={() => setIsHoveredTask(true)}
            onMouseLeave={() => setIsHoveredTask(false)}
        >
            <div className={`flex justify-between items-center px-3 py-1 ${priorityColor} rounded-t-lg`}>
                <div className="task-drag-area flex items-center">
                    <div className="drag-handle cursor-grab" {...attributes} {...listeners}>
                        <DragIcon className="h-4 w-4 text-gray-700" />
                    </div>
                </div>
                <div>
                    <DotsMenu toDoId={toDoId} taskId={taskId} onDelete={onDelete} onModify={handleModifyClick} className='text-gray-900 hover:bg-gray-600 hover:opacity-60 hover:text-white' />
                </div>
            </div>
            <div className='p-3 flex gap-2 items-center'>
                {isHoveredTask && !isEditing && (
                    <RadioButton
                        checked={completed}
                        taskId={taskId}
                        toDoId={toDoId}
                        className={`cursor-pointer animate__animated ${animationClass} radio_task_animation min-h-4 min-w-4`}
                        onCompletedChange={handleCompletedChange}
                    />
                )}
                {isEditing ? (
                    <form onSubmit={modifyTask} className="flex flex-col gap-2 rounded-lg overflow-hidden animate__animated animate__fadeInDown animate__faster">
                        <input
                            type="text"
                            name="description"
                            value={taskData.description}
                            onChange={handleTaskDataChange}
                            autoFocus
                            className="bg-gray-700 text-gray-200 p-2 rounded-lg"
                        />
                        <select
                            name="priority"
                            value={taskData.priority}
                            onChange={handleTaskDataChange}
                            className="bg-gray-700 text-gray-200 p-2 rounded-lg"
                        >
                            <option value='1'>High</option>
                            <option value='2'>Medium</option>
                            <option value='3'>Low</option>
                        </select>
                        <div className='flex items-center gap-2'>
                            <button type="submit" className="text-sm cursor-pointer p-2 rounded-lg text-gray-200 bg-blue-500 hover:bg-blue-700">Save</button>
                            <button type="button" onClick={handleCancelClick} className="text-sm cursor-pointer p-2 rounded-lg text-gray-200 bg-red-600 hover:bg-red-700">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <p>{description}</p>
                )}
                {completed && !isEditing && (
                    <span className='text-xs ml-auto text-green-600 animate__animated animate__bounceInLeft animate__faster'>Completed!</span>
                )}
            </div>
        </section>
    );
}