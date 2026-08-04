import type { SectionTitleProps } from "./types.ts"
export function SectionTitle({ title, subtitle } : SectionTitleProps) {
	return (
		<header className="company-section-title">
			<h2>{title}</h2>
			{subtitle ? <p>{subtitle}</p> : null}
		</header>
	)
}