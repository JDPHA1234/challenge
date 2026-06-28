import { Link } from "./Link.jsx"
import { NavLink } from "react-router-dom"
import { useAuthStore } from "../store/authStore.js"
export function Header() {
    const {isLoggedIn , avatar_url} = useAuthStore()
    const loginButton = isLoggedIn ? 
        <img src={avatar_url} alt="Foto del usuario" />  : <NavLink to="/login">Iniciar Sesion</NavLink>
    const uploadcv = isLoggedIn ? <NavLink to="/profile">Subir CV</NavLink> : null
    return (
        <header>
            <h1>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                DevJobs
            </h1>
            <nav aria-label="Navegacion Principal">
                <NavLink to="/" className={({ isActive }) => isActive ? "isActiveLink" : ""}>Inicio</NavLink>
                <NavLink to="/search" className={({ isActive }) => isActive ? "isActiveLink" : ""}>Empleos</NavLink>
                <NavLink to="/companies" className={({ isActive }) => isActive ? "isActiveLink" : ""}>Empresas</NavLink>
            </nav>
            <div>
                {uploadcv}
                {loginButton}
            </div>
        </header>)
}
