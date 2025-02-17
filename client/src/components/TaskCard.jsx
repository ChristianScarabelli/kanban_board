import { useContext, useState } from 'react';
import DotsMenu from '../components/ui/DotsMenu.jsx';
import { GlobalContext } from '../contexts/GlobalContext.jsx';
import RadioButton from './ui/RadioButton.jsx';

export default function TaskCard({ task, id }) {

    // Stato per gestire localmente l'hover di una task
    const [isHoveredTask, setIsHoveredTask] = useState(false);

    // Stato per l'animazione dell'hover
    const { animationClass, setAnimationClass } = useContext(GlobalContext)

    const { description, priority, completed } = task;

    // Funzione per determinare la classe di colore in base alla priorità
    const getPriorityColor = (priority) => {
        if (priority == null) {
            return 'bg-gray-200';
        }

        switch (priority) {
            case 1:
                return 'bg-green-600';
            case 2:
                return 'bg-orange-400';
            case 3:
                return 'bg-red-600';
            default:
                return 'bg-gray-200';
        }
    };

    // Invoco la funzione e gli passo la priority che arriva dal DB
    const priorityColor = getPriorityColor(priority);

    return (
        <section
            className="flex flex-col bg-gray-200 rounded-lg text-gray-800"

        >
            <div className={`flex justify-end items-center px-3 py-1 ${priorityColor} rounded-t-lg`}>
                <DotsMenu className='text-gray-700 hover:bg-gray-600 hover:opacity-30 hover:text-white' />
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
                {isHoveredTask && <RadioButton checked={completed} id={id} className={`cursor-pointer animate__animated ${animationClass} radio_task_animation h-4 w-4`} />}
                <p>{description}</p>

                {completed === 1 &&
                    <span className='text-xs ml-auto text-green-600 '>Completed</span>
                }

            </div>

        </section>
    );
}