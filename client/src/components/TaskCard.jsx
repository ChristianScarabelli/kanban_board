import { useContext, useState } from 'react';
import axios from "axios";
import { GlobalContext } from '../contexts/GlobalContext.jsx';

// Components
import DotsMenu from '../components/ui/DotsMenu.jsx';
import RadioButton from './ui/RadioButton.jsx';

export default function TaskCard({ task, taskId, toDoId, onDelete, onModify }) {

    const { description, priority } = task;

    // Stati
    // Stato per l'animazione dell'hover
    const { animationClass, setAnimationClass } = useContext(GlobalContext);
    // Stato per gestire localmente l'hover di una task
    const [isHoveredTask, setIsHoveredTask] = useState(false);
    // Stato per gestire il completamente della task
    const [completed, setCompleted] = useState(task.completed === 1 ? task.completed : '');
    // Stato per gestire la modifica della task
    const [isEditing, setIsEditing] = useState(false);
    // Stato per settare i nuovi dati alla modifica (di default quelli del db)
    const [taskData, setTaskData] = useState({ description, priority });

    // Funzione per collegare i value del form di modifica con il loro stato
    const handleTaskDataChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: name === 'priority' ? parseInt(value) : value
        });
    }

    // Funzione per eseguire la modifica della task
    const modifyTask = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/todos/${toDoId}/tasks/${taskId}`, taskData);
            onModify();
            setIsEditing(false);
        } catch (err) {
            console.error("Error modifying the task!", err);
        }
    }

    // Funzione per gestire la modifica al click del suo bottone
    const handleModifyClick = () => {
        setIsEditing(true);
    };

    // Funzione per determinare la classe di colore in base alla priorità
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

    // Invoco la funzione e gli passo la priority che arriva dal DB
    const priorityColor = getPriorityColor(priority);

    // Funzione di callback per aggiornare lo stato completed
    const handleCompletedChange = (newCompleted) => {
        setCompleted(newCompleted);
    };

    // Funzione per annullare la modifica
    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <section className={`${isEditing && 'bg-gray-600'} flex flex-col bg-gray-200 rounded-lg text-gray-800`}>
            <div className={`flex justify-end items-center px-3 py-1 ${priorityColor} rounded-t-lg`}>
                <DotsMenu toDoId={toDoId} taskId={taskId} onDelete={onDelete} onModify={handleModifyClick} className='text-gray-900 hover:bg-gray-600 hover:opacity-60 hover:text-white' />
            </div>
            <div className='p-3 flex gap-2 items-center'
                onMouseEnter={() => {
                    setIsHoveredTask(true);
                    setAnimationClass('animate__fadeInLeft');
                }}
                onMouseLeave={() => {
                    setAnimationClass('animate__fadeOutLeft');
                    setTimeout(() => setIsHoveredTask(false), 150); // Durata dell'animazione
                }}
            >
                {isHoveredTask && !isEditing && (
                    <RadioButton
                        checked={completed}
                        taskId={taskId}
                        toDoId={toDoId}
                        className={`cursor-pointer animate__animated ${animationClass} radio_task_animation  min-h-4 min-w-4`}
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