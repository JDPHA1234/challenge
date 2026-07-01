import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";
export function ProtectedRoute({children})
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