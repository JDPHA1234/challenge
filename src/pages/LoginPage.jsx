
import { NavLink } from "react-router-dom"
export default function LoginPage() {
    return (
        <main className="mainLogin">
        <div className="titleLogin">
        <h1>Welcome Back</h1>
        <small>Log in to find your next opportunity</small>
        </div>
        <article className="cardLogin">
            <form>
                <div className="inputLogin">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /><path d="M3 7l9 6l9 -6" /></svg>
                <input type="email" placeholder="Email"/>
                </div>
                <div className="inputLogin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="checkLogin">
                    <label htmlFor="rememberMe">
                        <input type="checkbox" id="rememberMe"/> Recordarme</label>
                    <NavLink to="/register">Olvide mi contraseña</NavLink>
                </div>
                <div className="buttonLogin">
                <button type="submit">Iniciar sesión</button>
                </div>
            </form>
            <footer className="cardLoginFooter" >
                <p>¿No tienes una cuenta? <NavLink to="/register">Registrate</NavLink></p>
            </footer>
        </article>
    </main>
    )
}