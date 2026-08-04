import { useId, useState, useEffect ,useRef} from 'react'
import type { ReactNode } from 'react'
import type { FormProps , Filter} from './types.ts'
export function Form({ onSearch, onChangeText, onReset, initialValue ,initialFilterValue}: FormProps) {
    const idText = useId();
    const idTech = useId();
    const idmod = useId();
    const idExp = useId()
    const [focusField, setFocusElement] = useState<boolean>(false)
    const focusSearch = focusField ? 'is-focus' : ''
    const timeOutId = useRef<number | null>(null)
    const handleSubmit = (event : React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    const handleChange = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (event.target.name === idText) {
            const text = event.target.value;
            if(timeOutId.current)
            {
                clearTimeout(timeOutId.current);
            }
            timeOutId.current=setTimeout(() =>{
                onChangeText(text)
            },500);
        } else {
            const formData = new FormData(event.currentTarget)
            const filters : Filter = {
                tech: formData.get(idTech) as string,
                mod: formData.get(idmod) as string,
                idExp: formData.get(idExp)as string
            }
            if(timeOutId.current)
            {
                clearTimeout(timeOutId.current);
            }
            timeOutId.current=setTimeout(() =>{
                onSearch(filters);
            },500);
        }

    }
    const handleFocus = (event : React.FocusEvent<HTMLInputElement>) => {
        setFocusElement(true);
    } 
    const handleBlud = (event : React.FocusEvent<HTMLInputElement>) => {
        setFocusElement(false);
    }
    const handleClear = () => {
        const element = document.querySelector<HTMLFormElement>('.searchForm')
        if (element) {
            element.reset()
        }
        onReset()
    }
    return (
        <section className="search-section">
            <h1>Encuentra tu proximo Trabajo</h1>
            <p>Explora miles de oportunidades en el sector tecnologico y encuentra la posicion perfecta para tu carrera. Conecta con empresas líderes que buscan talento como el tuyo.</p>
            <form role="search" onChange={handleChange} onSubmit={handleSubmit} className='searchForm' >
                <div className={`form-search  ${focusSearch} formSearchDiv`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    <input id="jobs-input-search" onFocus={handleFocus} onBlur={handleBlud} name={idText} type="text" placeholder="Buscar trabajos,empresas o habilidades" defaultValue={initialValue}/>
                </div>
                <div className="form-filters">
                    <select id="tech-filter" name={idTech} aria-label="Tecnologia" defaultValue={initialFilterValue.tech}>
                        <option value="">Tecnologia</option>
                        <option value="react">React</option>
                        <option value="node">Node.js</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="java">Java</option>
                    </select>
                    <select id="modalidad-filter" name={idmod} aria-label="Modalidad" defaultValue={initialFilterValue.mod}>
                        <option value=""  >Modalidad</option>
                        <option value="presencial">Presencial</option>
                        <option value="hibrido">Semi-presencial</option>
                        <option value="remoto">Remoto</option>
                    </select>
                    <select id="experience-filter" name={idExp} aria-label="Nivel de experiencia" defaultValue={initialFilterValue.idExp}>
                        <option value=""  >Nivel de experiencia</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                        <option value="semi-senior">Semi senior</option>
                        <option value="engineer">Engineer</option>
                    </select>
                    <input type="submit" value="Filtrar" hidden />
                    <button type='button' id="button-clear" onClick={handleClear}>Limpiar</button>
                </div>
            </form>
        </section>
    )
}