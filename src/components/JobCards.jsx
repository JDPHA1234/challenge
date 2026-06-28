import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from "../store/authStore.js"
export function JobCard({ jobs }) {
    const {isLoggedIn} = useAuthStore()
    const [isApplied, setApplied] = useState(false)
    const text = isApplied ? 'Aplicado' : 'Aplicar'
    const classButton = isApplied ? 'button-apply-job' : ''
    function handleClick() {
        setApplied(!isApplied);
    }
    return (
        
        <article className='result-search'
            data-modalidad={"full-time"}
            data-tecnologia={jobs?.technology}
            data-location={jobs?.ubicacion}
            data-experience={jobs?.nivel}>
            <div>
            <Link to={`/details/${jobs.id}`} className='titleLink'>{jobs.titulo}</Link>
                {isLoggedIn && (
                    <button disabled={isApplied} className={classButton} onClick={handleClick} >{text}</button>
                )}
            </div>
            <small>{jobs.Empresa.nombre} | {jobs.modalidad} ({jobs.ubicacion})</small>
            <p>{jobs.descripcion}</p>
        </article>
    )

}
