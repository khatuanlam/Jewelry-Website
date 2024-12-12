'use client'

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
    const [windowWidth, setwindowWidth] = useState(0);
    const [showNotification, setShowNotification] = useState('')
    const router = useRouter();

    useEffect(() => {
        if (showNotification !== '') {
            const timer = setTimeout(() => {
                setShowNotification('')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showNotification])

    const value = {
        windowWidth,
        router,
        setShowNotification,
        showNotification
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useRouterContext = () => {
    return useContext(ThemeContext)
}

export default ThemeProvider