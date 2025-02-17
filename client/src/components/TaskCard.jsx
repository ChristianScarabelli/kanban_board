import DotsMenu from '../components/ui/DotsMenu.jsx'

export default function TaskCard({ task }) {

    const { description, priority, completed } = task

    // Funzione per switchare colore priority
    const getPriorityColor = (priority) => {

        if (priority == null) {
            return 'bg-gray-200'
        }

        switch (priority) {
            case 1:
                return 'bg-green-600'
            case 2:
                return 'bg-orange-400'
            case 3:
                return 'bg-red-600'
            default:
                return 'bg-gray-200'
        }
    }

    // Invoco la funzione e gli passo la priority che arriva dal DB
    const priorityColor = getPriorityColor(priority)

    return (
        <section className="flex flex-col bg-gray-200 rounded-lg text-gray-800">
            <div className={`flex justify-end items-center px-3 py-1 ${priorityColor} rounded-t-lg`}>
                <DotsMenu className='text-gray-700 hover:bg-gray-600 hover:opacity-30 hover:text-white' />
            </div>
            <div className='p-3'>
                <p>{description}</p>
                <span>{completed}</span>
            </div>
        </section>
    )
}