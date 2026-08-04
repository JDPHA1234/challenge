import { useState, useEffect } from 'react'
import { Link } from '../components/Link'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase-client'
import { Spinner } from '../components/Spinner'
import { JobDetails } from '../components/JobDetails'
import type { job } from '../components/types'

export default function Details() {
    const [loading, setLoading] = useState(true)
    const [job, setJob] = useState<job | null>(null)
    const [error, SetError] = useState<string | null>(null)
    const { id } = useParams()
    useEffect(() => {
        async function fetchJob() {
            try {
                setLoading(true)
                SetError(null)
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
                if (!data) {
                    throw new Error('No se encontró la oferta solicitada.')
                }
                setJob(data as job)
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error)
                SetError(message)
                console.error('error fetching de datos', message)
            } finally {
                setLoading(false)
            }
        }

        fetchJob()
    }, [id])
        if(loading){
            return <Spinner />
        }
        if(error){
            return (
                <div className="loginError">
                    <p>{error}</p>
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
                <small>{(() => {
                    const companyName = Array.isArray(job.Empresa)
                        ? job.Empresa[0]?.nombre
                        : job.Empresa?.nombre || ''
                    return `${companyName} | ${job.ubicacion}`
                })()}</small>
                </div>
    
            </header>
            <JobDetails title='Descripcion del puesto' content={job.content?.description ?? null} />
            <JobDetails title='Responsabilidades' content={job.content?.responsibilities ?? null} />
            <JobDetails title='Requisitos' content={job.content?.requirements ?? null} />
            <JobDetails title='Acerca de la empresa' content={job.content?.about ?? null} />
            <div>
            </div>
        </section>
    </main> 
    )
}