import { useState, useEffect } from 'react'
import { Link } from '../components/Link.jsx'
import { useParams } from 'react-router-dom'
import snarkdown from 'snarkdown'
import { supabase } from '../supabase-client.js'
function JobDetails({title,content}) {
    const html = content ? snarkdown(content) : ''
    return (
        <article className="Each-details">
                <h2>{title}</h2>
                <div className="prose" dangerouslySetInnerHTML={{__html : html}} />
                
            </article>
    )
}

        
export default function Details(){
    const [loading,setLoading] = useState(true)
    const [job,setJob] = useState(null)
    const [error,SetError] = useState(null)
    const {id}= useParams()
    useEffect(() => {
        async function fetchJob() {
            try {
                const { data, error } = await supabase.from('Trabajo').select(
                `titulo,
                ubicacion,
                Empresa!inner (
                    nombre
                ),
                content
                `).eq('id', id).single()
                if (error) {
                    throw error
                    }
              console.log(data)
                setJob(data)
            } catch (error) {
                SetError(error.message)
                console.error('error fetching de datos', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJob()
    }, [id])
        if(loading){
            return (
                <div>
                    <p>Cargando...</p>
                </div>
            )
        }
        if(error){
            return (
                <div>
                    <p>No se pudo cargar el empleo.</p>
                </div>
            )
        }

        if (!job) {
            return null
        }
    return (
         <main>
            <aside>
            <small className = "small"><Link href='/search' className = "linkSmall">Empleos</Link> / {job.titulo}</small>
            </aside>
        <section className="Section-detailsOffer">
            <header>
                <div>
                <h1>{job.titulo}</h1>
                <small>{job.Empresa.nombre} | {job.ubicacion}</small>
                </div>
                <button>Aplicar ahora</button>
    
            </header>
            <JobDetails title='Descripcion del puesto' content={job.content?.description} />
            <JobDetails title='Responsabilidades' content={job.content?.responsibilities} />
            <JobDetails title='Requisitos' content={job.content?.requirements} />
            <JobDetails title='Acerca de la empresa' content={job.content?.about} />
            <div>
            </div>
        </section>
    </main> 
    )
}