'use client'

import { login } from "@lib/actions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
    // const { data: session } = useSession();
    const [userLogin, setUserLogin] = useState(null);

    useEffect(() => {
        const savedCookie = Cookies.get('login_status');
        if (savedCookie) {
            setCookieValue(savedCookie);
        }
    }, []);

    const updateCookie = (newValue) => {
        setUserLogin(newValue)
        login(newValue)
    }
    return (
        <AuthContext.Provider value={{ userLogin, updateCookie }}>
            {children}
        </AuthContext.Provider>
    );
}
