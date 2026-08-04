import snarkdown from 'snarkdown'
import type { JobDetailsProps } from './types.ts'

export function JobDetails({title,content}: JobDetailsProps) {
    const html = content ? snarkdown(content) : ''
    return (
        <article className="Each-details">
                <h2>{title}</h2>
                <div className="prose" dangerouslySetInnerHTML={{__html : html}} />
                
            </article>
    )
}