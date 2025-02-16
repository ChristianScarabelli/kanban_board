import { EllipsisHorizontalIcon as DotsIcon } from "@heroicons/react/20/solid"

export default function DotsMenu({ onClick }) {
    return (
        <section className="">
            <button onClick={onClick} className="flex items-center justify-center p-3 rounded-lg bg-gray-400 text-gray-200 hover:bg-blue-500">
                <DotsIcon className="h-5 w-5" />
            </button>
        </section>
    )
}