import { useState } from 'react'
import { Link } from 'react-router-dom'
export function JobCard({ jobs }) {
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
                <button disabled={isApplied} className={classButton} onClick={handleClick} >{text}</button>
            </div>
            <small>{jobs.empresa} | {jobs.ubicacion} </small>
            <p>{jobs.descripcion}</p>
        </article>
    )

}
