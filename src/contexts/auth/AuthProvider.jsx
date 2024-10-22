
import { useSession } from "next-auth/react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
    const { data: session } = useSession();
    const { user, setUser } = useState(null);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);