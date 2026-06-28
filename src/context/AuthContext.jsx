import { createContext ,useState,useContext} from "react"
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
export const AuthContext = createContext()

export function AuthProvider({children}) {
    const { loading , getAuth } = useAuthStore();

    useEffect(() => {
        getAuth();
    }, []);
    // Si aún está cargando, mostramos el spinner globalmente
    if (loading) return <Spinner />;
    return (
        <AuthContext value={user}>
            {children}
        </AuthContext>
    )
}
export function useAuth(){
    const context = useContext(AuthContext)
    return context
}