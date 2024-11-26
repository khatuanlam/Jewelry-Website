'use client'

import products from '@content/products.json';
import users from '@content/users.json';
import { useRouter } from 'next/navigation';
import { useContext, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
    const [windowWidth, setwindowWidth] = useState(0);
    const [cartItems, setcartItems] = useState([]);
    const [user, setUser] = useState(users);
    const [product, setProduct] = useState(products)
    const router = useRouter();


    const value = {
        windowWidth,
        cartItems,
        user,
        product, setProduct,
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