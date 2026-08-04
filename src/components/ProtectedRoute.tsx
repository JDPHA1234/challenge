import { useAuthStore } from "../store/authStore.js";
import { Navigate } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";
import type { ProtectedRouteProps } from "./types.ts";
export function ProtectedRoute({children} : ProtectedRouteProps)
{
    const {isLoggedIn , loading} = useAuthStore();

    if(loading)
    {
        return <Spinner />
    }
    if(!isLoggedIn)
    {
        return <Navigate to='/login' replace />
    }
    return children
}