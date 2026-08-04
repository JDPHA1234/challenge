import { AsideProfile } from '../components/AsideProfile.js'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase-client.js'
import { useAuthStore } from '../store/authStore.js'
import { NavLink } from 'react-router-dom'
import { Spinner } from '../components/Spinner.js'
import { ReactNode } from 'react'
import type { Application , StatusBadgeProps} from '../components/types.js'


function StatusBadge({ tone, children }: StatusBadgeProps) {
	return <span className={`candidacy-status candidacy-${tone}`}>{children}</span>
}
const formatearFecha = (fechaISO: string | undefined) => {
	if (!fechaISO) return '' // Por si la fecha viene vacía

	const fecha = new Date(fechaISO);

	return fecha.toLocaleDateString('es-AR', {
		day: '2-digit',
		month: 'short', // o 'long' para "junio" completo
		year: 'numeric'
	});
};

export default function Mycandidacies() {
	const [loading, setLoading] = useState(true)
	const [applications, setApplications] = useState<Application[] | null>([])
	const [error, setError] = useState<string | null>(null)
	const { user } = useAuthStore()
	useEffect(() => {
		async function obtenerMisSolicitudes(userId : string)  {
			try {
				setLoading(true)
				setError(null)
				const { data, error } = await supabase
					.from('Solicitud')
					.select(`
        created_at,
        status,
		cvSolicitud_url,
        Trabajo (
          titulo,
          ubicacion,
          modalidad,
          Empresa (
            nombre
          )
        )
      `)
					.eq('idUsuario', userId);

				if (error) {
					throw error;
				}
				setApplications(data as Application[])

			} catch (error) {
				setError((error as Error).message)
				console.error('Error al obtener las solicitudes:', error);
			} finally {
				setLoading(false) // Terminamos la carga
			}
		}
		if (!user?.id) {
			setError('Debes iniciar sesión para ver tus candidaturas.')
			setLoading(false)
			return
		}
		obtenerMisSolicitudes(user.id)
	}, [user?.id])
	if (loading) {
		return <Spinner />
	}
	if (error) {
		return (
			<div className="loginError">
				<p>{error}</p>
			</div>
		)
	}
	return (
		<div className="appConteiner">
			<AsideProfile />
			<main className="candidacies-page">
				<section className="candidacies-header">
					<h1>Mis candidaturas</h1>
					<p>Gestiona y haz seguimiento del estado de tus aplicaciones activas.</p>
				</section>
				<section className="candidacies-list" aria-label="Lista de candidaturas">
					{applications?.map((app) => {
						const companyName = Array.isArray(app?.Trabajo?.Empresa)
							? app?.Trabajo?.Empresa[0]?.nombre
							: app?.Trabajo?.Empresa?.nombre || ''
						const cvHref = app?.cvSolicitud_url ?? undefined

						return (
							<article key={`${app?.Trabajo?.titulo}-${app?.created_at}`} className="candidacy-item">
								<div className="candidacy-icon" aria-hidden="true">
									<span>{app?.Trabajo?.titulo?.slice(0, 1)}</span>
								</div>

								<div className="candidacy-main">
									<h2>{app?.Trabajo?.titulo}</h2>
									<p>
										{companyName} <span aria-hidden="true">•</span> {app?.Trabajo?.ubicacion}
									</p>
								</div>

								<div className="candidacy-meta">
									<span className="candidacy-applied-label">Aplicado el</span>
									<strong>{formatearFecha(app?.created_at)}</strong>
								</div>

								<StatusBadge tone='info'>{app.status}</StatusBadge>

								<a href={cvHref} target="_blank" rel="noopener noreferrer" className="candidacy-arrow" aria-label={`Ver CV de ${app?.Trabajo?.titulo}`}>
									›
								</a>
							</article>
						)
					})}
				</section>

			</main>

		</div>
	)
}
