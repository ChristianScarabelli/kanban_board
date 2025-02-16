import AddButton from "./ui/AddButton";
import ModifyButton from "./ui/ModifyButton";
import DeleteButton from "./ui/DeleteButton";

import { useState } from "react";


export default function TodoCard() {

    const [inHover, setInHover] = useState(false)

    return (
        <section>
            <div className="flex flex-col justify-start p-3 rounded-lg bg-gray-800 text-gray-400"
                onMouseEnter={() => setInHover(true)}
                onMouseLeave={() => setInHover(false)}
            >
                <h2>To do title</h2>
                {
                    inHover &&
                    <>
                        <ModifyButton />
                        <AddButton />
                        <DeleteButton />
                    </>
                }

            </div>
        </section>
    )
}