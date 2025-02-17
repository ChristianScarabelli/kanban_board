import { createContext, useState } from "react";


export const GlobalContext = createContext()

function GlobalProvider({ children }) {

    // Hover
    const [inHover, setInHover] = useState(false)

    // Spinner
    const [isLoading, setIsLoading] = useState(false)

    // Classi animazione
    const [animationClass, setAnimationClass] = useState('');


    return (
        <GlobalContext.Provider value={{ inHover, setInHover, animationClass, setAnimationClass }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;