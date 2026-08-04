import { Link } from "../components/Link.js"
import { supabase } from "../supabase-client.js"
import { useState, useEffect, use } from "react"
import { useParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner.jsx'
import { SectionTitleProps , job ,Empresa} from '../components/types.ts'
const stats = [
	{ value: "98%", label: "Retención" },
	{ value: "120+", label: "Proyectos" },
	{ value: "15", label: "Países" },
	{ value: "4.8/5", label: "Glassdoor" },
]

const benefits = [
	{
		"title": "Salario en USD",
		"description": "Compensación 100% en dólares con bonos cuatrimestrales por rendimiento del fondo.",
	},
	{
		"title": "Salario Competitivo",
		"description": "Revisiones semestrales basadas en impacto, desempeño y resultados del equipo.",
	},
	{
		"title": "Presupuesto para Formación",
		"description": "Hasta 2000 USD anuales para cursos, libros, certificaciones y conferencias.",
	},
	{
		"title": "Bienestar & Salud",
		"description": "Seguro médico premium de primera línea y suscripción gratuita a red de gimnasios.",
	},
]

const positions = [
	{
		title: "Senior Frontend Developer",
		meta: "Remoto (Europa)",
		salary: "65k - 85k €",
		tags: ["React", "TypeScript"],
	},
	{
		title: "Backend Engineer (Node.js)",
		meta: "Híbrido (Madrid)",
		salary: "50k - 70k €",
		tags: ["Node.js", "AWS"],
	},
	{
		title: "Product Designer (UX/UI)",
		meta: "Remoto",
		salary: "45k - 60k €",
		tags: ["Figma", "Systems"],
	},
]

function SectionTitle({ title, subtitle } : SectionTitleProps) {
	return (
		<header className="company-section-title">
			<h2>{title}</h2>
			{subtitle ? <p>{subtitle}</p> : null}
		</header>
	)
}

export default function Empresa() {
	const [loading, setLoading] = useState(true)
	const [empresa, setEmpresa] = useState<Empresa | null>(null)
	const [error, SetError] = useState<string | null>(null)
	const [trabajo, setTrabajo] = useState<job[] | null>(null)
	const { id } = useParams()
	useEffect(() => {
		async function fetchEmpresa() {
			try {
				setLoading(true)
				SetError(null)
				const [empresaReq, trabajoReq] = await Promise.all([
					supabase.from('Empresa').select('*').eq('id', id).single(),
					supabase.from('Trabajo').select('*').eq('idEmpresa', id).limit(3),
				]);

				if (empresaReq.error) throw empresaReq.error;
				if (trabajoReq.error) throw trabajoReq.error;

				// Guardamos los estados
				setEmpresa(empresaReq.data);
				setTrabajo(trabajoReq.data || []);
			} catch (error) {
				SetError((error as Error).message)
				console.error('error fetching de datos', error)
			} finally {
				setLoading(false)
			}
		}

		fetchEmpresa()
	}, [id])
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

	if (!empresa) {
		return null
	}
	return (
		<main className="company-page">
			<section className="company-hero">
				<img className="company-hero-image" src={empresa.image_url} alt={empresa.nombre} />
				<div className="company-hero-overlay" />
				<div className="company-hero-content">
					<div aria-hidden="true">
						<img src={empresa.logo_url} className="logo-empresa" alt={empresa.nombre} />
					</div>
					<div className="company-hero-copy">
						<h1>{empresa.nombre}</h1>
						<div className="company-badges">
							<span>Tecnología & Software</span>
							<span>{empresa.ubicacion}</span>
							<span>{empresa.cant_empleados}+ empleados</span>
						</div>
					</div>
					<div className="company-actions">
						<a className="company-secondary-action" href={empresa.sitio_web_url} target="_blank" rel="noopener noreferrer">
							Ver Sitio Web
						</a>
					</div>
				</div>
			</section>

			<section className="company-layout">
				<div className="company-main-column">
					<section className="company-card company-about-card">
						<SectionTitle title="Sobre Nosotros" />
						<p>
							{empresa.descripcion}
						</p>
						<dl className="company-stats">
							{empresa.stats && empresa.stats.map((stat) => (
								<div key={stat.label}>
									<dt>{stat.value}</dt>
									<dd>{stat.label}</dd>
								</div>
							))}
						</dl>
					</section>

					<section className="company-card">
						<SectionTitle title="Beneficios" />
						<div className="benefits-grid">
							{empresa.benefits && empresa.benefits.map((benefit) => (
								<article key={benefit.title} className="benefit-item">
									<div className="benefit-icon" aria-hidden="true">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
											<path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-4a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5Z" />
											<path d="M9 11v-2a3 3 0 0 1 6 0v2" />
										</svg>
									</div>
									<div>
										<h3>{benefit.title}</h3>
										<p>{benefit.description}</p>
									</div>
								</article>
							))}
						</div>
					</section>
				</div>

				<aside className="company-card company-sidebar">
					<SectionTitle title="Posiciones Abiertas"/>
					<div className="open-positions">
						{trabajo?.map((position) => (
							<article key={position.titulo} className="position-card">
								<h3>{position.titulo}</h3>
								<p className="position-meta">{position.modalidad}({position.ubicacion})</p>
								<p className="position-salary">{position.salarioMin}- {position.salarioMax}</p>
								<div className="position-tags">
									{position.technology && position.technology.map((tag) => (
										<span key={tag}>{tag}</span>
									))}
								</div>
							</article>
							
						))}
					</div>
					<Link href="/search" className="company-all-jobs">
						Ver todas las vacantes →
					</Link>
				</aside>
			</section>
		</main>
	)
}