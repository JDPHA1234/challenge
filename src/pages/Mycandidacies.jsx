import { AsideProfile } from '../components/AsideProfile'

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

export default function Mycandidacies() {
	return (
        <div className="appConteiner">
        <AsideProfile/>
		<main className="candidacies-page">
			<section className="candidacies-header">
				<h1>Mis candidaturas</h1>
				<p>Gestiona y haz seguimiento del estado de tus aplicaciones activas.</p>
			</section>
			<section className="candidacies-summary" aria-label="Resumen de candidaturas">
				{summaryCards.map((card) => (
					<article key={card.label} className={`candidacy-summary-card ${card.tone ? `tone-${card.tone}` : ''}`}>
						<span>{card.label}</span>
						<strong>{card.value}</strong>
					</article>
				))}
			</section>

			<section className="candidacies-list" aria-label="Lista de candidaturas">
				{applications.map((job) => (
					<article key={`${job.title}-${job.date}`} className="candidacy-item">
						<div className="candidacy-icon" aria-hidden="true">
							<span>{job.title.slice(0, 1)}</span>
						</div>

						<div className="candidacy-main">
							<h2>{job.title}</h2>
							<p>
								{job.company} <span aria-hidden="true">•</span> {job.location}
							</p>
						</div>

						<div className="candidacy-meta">
							<span className="candidacy-applied-label">Aplicado el</span>
							<strong>{job.date}</strong>
						</div>

						<StatusBadge tone={job.badgeTone}>{job.status}</StatusBadge>

						<button type="button" className="candidacy-arrow" aria-label={`Ver detalles de ${job.title}`}>
							›
						</button>
					</article>
				))}
			</section>

		</main>

        </div>
	)
}
