import DotsMenu from '../components/ui/DotsMenu.jsx'

export default function TaskCard({ task, data }) {

    const { description, priority, completed } = task
    return (
        <section className="flex flex-col p-3 bg-gray-200 rounded-lg text-gray-800">
            <div className='flex justify-between items-center'>
                <span>{priority}</span>
                <DotsMenu className='text-gray-600 hover:bg-gray-600 hover:opacity-30 hover:text-white' />
            </div>
            <div>
                <p>{description}</p>
                <span>{completed}</span>
            </div>
        </section>
    )
}