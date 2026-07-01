import { createContext, useContext, useEffect } from "react"
import { useAuthStore } from "../store/authStore";
import { Spinner } from "../components/Spinner.jsx";
export const AuthContext = createContext()

export function AuthProvider({children}) {
    const { loading, initializeAuth, user } = useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);
    // Si aún está cargando, mostramos el spinner globalmente
    if (loading) return <Spinner />;
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    const context = useContext(AuthContext)
    return context
}