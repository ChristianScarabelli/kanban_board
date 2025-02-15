import Logo from '../assets/kanban-board.svg'

export default function Header() {
    return (
        <header className='bg-gray-800'>
            <div className='flex justify-items-start items-center gap-2 px-3 py-2'>
                <figure>
                    <img className='w-auto h-8' src={Logo} alt="Logo" />
                </figure>
                <h1 className='text-xl text-gray-400'>Kanban Board</h1>
            </div>
        </header>
    )
}