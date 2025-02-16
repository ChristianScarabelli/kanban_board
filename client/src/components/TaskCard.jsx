export default function TaskCard({ task }) {

    const { description, priority, completed } = task
    return (
        <section className="flex flex-col p-3 bg-gray-400 rounded-lg text-gray-800">
            <div>
                <p>{description}</p>
                <span>{priority}</span>
                <span>{completed}</span>
            </div>
        </section>
    )
}