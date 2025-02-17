import { EllipsisHorizontalIcon as DotsIcon } from "@heroicons/react/20/solid"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ModifyButton from './ModifyButton.jsx'
import DeleteButton from './DeleteButton.jsx'

export default function DotsMenu({ onClick, className }) {

    return (
        <section>
            <Menu>
                <MenuButton>
                    <button onClick={onClick} className={`${className} cursor-pointer flex items-center justify-center rounded-lg p-2`}>
                        <DotsIcon className="h-5 w-5 " />
                    </button>
                </MenuButton>
                <MenuItems
                    anchor="bottom"
                    className="flex bg-gray-800 rounded-lg p-2 mt-2 shadow-lg"
                >
                    <MenuItem>
                        <span className="block">
                            <ModifyButton />
                        </span>
                    </MenuItem>
                    <MenuItem>
                        <span className="block">
                            <DeleteButton />
                        </span>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </section>
    )
}