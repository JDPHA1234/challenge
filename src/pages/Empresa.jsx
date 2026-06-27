import { Link } from "../components/Link.jsx"

const stats = [
	{ value: "98%", label: "Retención" },
	{ value: "120+", label: "Proyectos" },
	{ value: "15", label: "Países" },
	{ value: "4.8/5", label: "Glassdoor" },
]

const benefits = [
	{
		title: "Remoto First",
		description: "Libertad total para trabajar desde donde mejor te sientas.",
	},
	{
		title: "Salario Competitivo",
		description: "Revisiones semestrales basadas en impacto y resultados.",
	},
	{
		title: "Presupuesto para Formación",
		description: "Hasta 2000€ anuales para cursos, libros y conferencias.",
	},
	{
		title: "Bienestar & Salud",
		description: "Seguro médico premium y suscripción a gimnasios.",
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

function SectionTitle({ title, subtitle }) {
	return (
		<header className="company-section-title">
			<h2>{title}</h2>
			{subtitle ? <p>{subtitle}</p> : null}
		</header>
	)
}

export default function Empresa() {
	return (
		<main className="company-page">
			<section className="company-hero">
				<img className="company-hero-image" src="/background.webp" alt="Oficina moderna con pantallas" />
				<div className="company-hero-overlay" />
				<div className="company-hero-content">
					<div className="company-brand-card" aria-hidden="true">
						<span>D</span>
					</div>
					<div className="company-hero-copy">
						<h1>DevJobs</h1>
						<div className="company-badges">
							<span>Tecnología & Software</span>
							<span>Madrid, España</span>
							<span>500+ empleados</span>
						</div>
					</div>
					<div className="company-actions">
						<a className="company-secondary-action" href="/search">
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
							DevJobs no es solo una plataforma: es el nexo entre el talento excepcional y las
							empresas que están definiendo el futuro. Nuestra misión es humanizar el proceso de
							reclutamiento técnico, priorizando la cultura, las metas personales y la excelencia
							en el código.
						</p>
						<dl className="company-stats">
							{stats.map((stat) => (
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
							{benefits.map((benefit) => (
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
					<SectionTitle title="Posiciones Abiertas" subtitle="4 activas" />
					<div className="open-positions">
						{positions.map((position) => (
							<article key={position.title} className="position-card">
								<h3>{position.title}</h3>
								<p className="position-meta">{position.meta}</p>
								<p className="position-salary">{position.salary}</p>
								<div className="position-tags">
									{position.tags.map((tag) => (
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
