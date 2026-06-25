import { createContext ,useState,useContext} from "react";
export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isLoggedIn,setLogginIn] = useState(false);
    const login = () => {
        setLogginIn(true);
    }
    const logout = () => {
        setLogginIn(false);
    }
    const value = {
        isLoggedIn,
        login,
        logout
    }
    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    )
}
export function useAuth(){
    const context = useContext(AuthContext)
    return context
}