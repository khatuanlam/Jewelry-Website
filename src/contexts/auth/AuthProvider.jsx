'use client'

import ThemeContext from "@contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
    // const { data: session } = useSession();
    const [userLogin, setUserLogin] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [admin, isAdmin] = useState(false)
    const { router } = useContext(ThemeContext)

    useEffect(() => {
        if (sessionStorage.getItem('user') != null) {
            setIsLoggedIn(true)
            const currentUser = JSON.parse(sessionStorage.getItem('user'))
            setUserLogin(currentUser)
        } else {
            setIsLoggedIn(false)
        }
    }, [isLoggedIn])


    // Đăng nhập
    const login = (user) => {
        setIsLoggedIn(true)
        console.log('Thực hiện đăng nhập');
        // Lưu giá trị vào session
        sessionStorage.setItem('user', user)
        const currentUser = JSON.parse(sessionStorage.getItem('user'))
        setUserLogin(currentUser)
    }

    // Đăng xuất
    const logout = () => {
        setIsLoggedIn(false)
        setUserLogin(null)
        // Xóa giá trị trong session 
        sessionStorage.clear()
        localStorage.clear()

        router.push('/')
    }

    const value = {
        isLoggedIn, login, logout, userLogin
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
