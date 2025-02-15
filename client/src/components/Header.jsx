import Logo from '../assets/kanban-board.svg'

export default function Header() {
    return (
        <header>
            <div className='flex justify-items-start'>
                <figure>
                    <img className='w-auto h-20' src={Logo} alt="Logo" />
                </figure>
                <h1 >Kanban Board</h1>
            </div>

        </header>
    )
}