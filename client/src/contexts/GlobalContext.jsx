import { createContext, useState } from "react";


export const GlobalContext = createContext()

function GlobalProvider({ children }) {

    // Hover
    const [inHover, setInHover] = useState(false)

    // Spinner
    const [isLoading, setIsLoading] = useState(false)


    return (
        <GlobalContext.Provider value={{ inHover, setInHover }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;