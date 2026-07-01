import { AsideProfile } from '../components/AsideProfile'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase-client.js'
import { useAuthStore } from '../store/authStore.js'
import { NavLink } from 'react-router'
import { Spinner } from '../components/Spinner.jsx'
const summaryCards = [
	{ label: 'Total', value: '12', tone: '' },
	{ label: 'En revisión', value: '4', tone: 'warning' },
	{ label: 'Entrevistas', value: '2', tone: 'info' },
	{ label: 'Cerradas', value: '6', tone: 'muted' },
]

const applications = [
	{
		title: 'Senior Frontend Developer',
		company: 'Stark Industries',
		location: 'Remoto (España)',
		date: '12 Oct 2023',
		status: 'Entrevista',
		badgeTone: 'info',
	},
	{
		title: 'React Engineer',
		company: 'CloudNine Systems',
		location: 'Híbrido (Barcelona)',
		date: '08 Oct 2023',
		status: 'En revisión',
		badgeTone: 'warning',
	},
	{
		title: 'Fullstack Developer (Node/Vue)',
		company: 'Fintech Flow',
		location: 'Remoto',
		date: '25 Sep 2023',
		status: 'Rechazada',
		badgeTone: 'danger',
	},
	{
		title: 'Javascript Architect',
		company: 'Nexus Gaming',
		location: 'Madrid',
		date: '15 Sep 2023',
		status: 'Entrevista',
		badgeTone: 'info',
	},
	{
		title: 'Lead Dev Ops',
		company: 'EcoDigital',
		location: 'Remoto',
		date: '10 Sep 2023',
		status: 'En revisión',
		badgeTone: 'warning',
	},
]

function StatusBadge({ tone, children }) {
	return <span className={`candidacy-status candidacy-${tone}`}>{children}</span>
}
const formatearFecha = (fechaISO) => {
	if (!fechaISO) return ''; // Por si la fecha viene vacía

	const fecha = new Date(fechaISO);

	return fecha.toLocaleDateString('es-AR', {
		day: '2-digit',
		month: 'short', // o 'long' para "junio" completo
		year: 'numeric'
	});
};

export default function Mycandidacies() {
	const [loading, setLoading] = useState(true)
	const [applications, setApplications] = useState([])
	const [error, setError] = useState(null)
	const { user } = useAuthStore()
	useEffect(() => {
		async function obtenerMisSolicitudes(userId) {
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
				setApplications(data || [])

			} catch (error) {
				setError(error.message)
				console.error('Error al obtener las solicitudes:', error.message);
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
					{applications.map((app) => (
						<article key={`${app.Trabajo.titulo}-${app.created_at}`} className="candidacy-item">
							<div className="candidacy-icon" aria-hidden="true">
								<span>{app.Trabajo.titulo.slice(0, 1)}</span>
							</div>

							<div className="candidacy-main">
								<h2>{app.Trabajo.titulo}</h2>
								<p>
									{app.Trabajo.Empresa.nombre} <span aria-hidden="true">•</span> {app.Trabajo.ubicacion}
								</p>
							</div>

							<div className="candidacy-meta">
								<span className="candidacy-applied-label">Aplicado el</span>
								<strong>{formatearFecha(app.created_at)}</strong>
							</div>

							<StatusBadge tone='info'>{app.status}</StatusBadge>

							<a href={app.cvSolicitud_url} target="_blank" rel="noopener noreferrer" className="candidacy-arrow" aria-label={`Ver CV de ${app.Trabajo.titulo}`}>
								›
							</a>
						</article>
					))}
				</section>

			</main>

		</div>
	)
}
