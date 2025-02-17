import { createContext, useState } from "react";

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
    // Hover
    const [inHover, setInHover] = useState(false);
    // Spinner
    const [isLoading, setIsLoading] = useState(false);
    // Classi animazione
    const [animationClass, setAnimationClass] = useState('');
    // ToggleButtonText
    const [toggleButtonText, setToggleButtonText] = useState(false);
    // Input value
    const [inputValue, setInputValue] = useState('');

    return (
        <GlobalContext.Provider value={{ inHover, setInHover, animationClass, setAnimationClass, toggleButtonText, setToggleButtonText, inputValue, setInputValue }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;