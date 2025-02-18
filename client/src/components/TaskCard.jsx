import { useContext, useState } from 'react';
import DotsMenu from '../components/ui/DotsMenu.jsx';
import { GlobalContext } from '../contexts/GlobalContext.jsx';
import RadioButton from './ui/RadioButton.jsx';

export default function TaskCard({ task, taskId, toDoId }) {

    const { description, priority } = task;

    // Stati
    // Stato per l'animazione dell'hover
    const { animationClass, setAnimationClass } = useContext(GlobalContext);
    // Stato per gestire localmente l'hover di una task
    const [isHoveredTask, setIsHoveredTask] = useState(false);
    // Stato per gestire il completamente della task
    const [completed, setCompleted] = useState(task.completed === 1 ? task.completed : '');


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

    return (
        <section className="flex flex-col bg-gray-200 rounded-lg text-gray-800">
            <div className={`flex justify-end items-center px-3 py-1 ${priorityColor} rounded-t-lg`}>
                <DotsMenu className='text-gray-900 hover:bg-gray-600 hover:opacity-60 hover:text-white' />
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
                {isHoveredTask && (
                    <RadioButton
                        checked={completed}
                        taskId={taskId}
                        toDoId={toDoId}
                        className={`cursor-pointer animate__animated ${animationClass} radio_task_animation h-4 w-4`}
                        onCompletedChange={handleCompletedChange}
                    />
                )}
                <p>{description}</p>

                {completed && (
                    <span className='text-xs ml-auto text-green-600 animate__animated animate__bounceInLeft animate__faster'>Completed!</span>
                )}
            </div>
        </section>
    );
}