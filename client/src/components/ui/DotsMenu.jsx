import { EllipsisHorizontalIcon as DotsIcon } from "@heroicons/react/20/solid"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ModifyButton from './ModifyButton.jsx'
import DeleteButton from './DeleteButton.jsx'

export default function DotsMenu({ onClick, className }) {

    return (
        <section>
            <Menu>
                {/* Uso as='div' per evitare conflitti di bottoni annidati in altri bottoni */}
                <MenuButton as="div">
                    <button onClick={onClick} className={`${className} cursor-pointer flex items-center justify-center rounded-lg p-2`}>
                        <DotsIcon className="h-5 w-5 " />
                    </button>
                </MenuButton>
                <MenuItems
                    anchor="bottom"
                    className="flex bg-gray-800 rounded-lg p-2 mt-2 shadow-lg animate__animated animate__fadeInDown dots_menu_animation"
                >
                    <MenuItem as="div">
                        <span className="block">
                            <ModifyButton />
                        </span>
                    </MenuItem>
                    <MenuItem as="div">
                        <span className="block">
                            <DeleteButton />
                        </span>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </section>
    )
}