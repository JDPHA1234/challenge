import { Link } from "./Link.jsx"
import { NavLink } from "react-router-dom"
import { useAuthStore } from "../store/authStore.js"
export function Header() {
    const {isLoggedIn,login} = useAuthStore()
    const loginButton = isLoggedIn ? <img src="../public/fotoperfil.webp" alt="Foto del usuario" /> : <button onClick={login}>Iniciar Sesion</button>
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
                <NavLink to="/salaries" className={({ isActive }) => isActive ? "isActiveLink" : ""}>Salarios</NavLink>
            </nav>
            <div>
                <button >Subir CV</button>
                {loginButton}
            </div>
        </header>)
}
