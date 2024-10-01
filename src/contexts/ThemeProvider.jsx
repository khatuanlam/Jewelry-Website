'use client'
import { useState } from "react"
import ThemeContext from "./ThemeContext"

const ThemeProvider = ({ children }) => {
    const [windowWidth, setwindowWidth] = useState(0)
    const [cartItems, setcartItems] = useState([])


    const value = {
        windowWidth,
        cartItems
    }


    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider