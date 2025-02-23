import { createContext, useState } from "react";

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
    // Spinner
    const [isLoading, setIsLoading] = useState(false);
    // Classi animazione
    const [animationClass, setAnimationClass] = useState('');
    // Error message
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <GlobalContext.Provider value={{ isLoading, setIsLoading, errorMessage, setErrorMessage, animationClass, setAnimationClass }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;