'use client'

import products from '@content/products.json';
import { useRouter } from 'next/navigation';
import { useContext, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
    const [windowWidth, setwindowWidth] = useState(0);
    const router = useRouter();

    const value = {
        windowWidth,
        products,
        router
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