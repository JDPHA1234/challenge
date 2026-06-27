import { useId, useState, useEffect ,useRef} from 'react'
export function Form({ onSearch, onChangeText, OnReset, initialValue ,initialFilterValue}) {
    const idText = useId();
    const idTech = useId();
    const idLoc = useId();
    const idContract = useId();
    const idExp = useId()
    const [focusField, setFocusElement] = useState(null)
    const focusSearch = focusField ? 'is-focus' : ''
    const timeOutId = useRef(null)
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const handleChange = (event) => {
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
            const filters = {
                tech: formData.get(idTech),
                location: formData.get(idLoc),
                contract: formData.get(idContract),
                idExp: formData.get(idExp)

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
    const handleFocus = (event) => {
        setFocusElement(event.target);
    } 
    const handleBlud = (event) => {
        setFocusElement(null);
    }
    const handleClear = () => {
        document.querySelector('.searchForm').reset()
        OnReset();
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
                        <option value="node.js">Node.js</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                    <select id="location-filter" name={idLoc} aria-label="Modalidad" defaultValue={initialFilterValue.location}>
                        <option value=""  >Modalidad</option>
                        <option value="presencial">Presencial</option>
                        <option value="semi-presencial">Semi-presencial</option>
                        <option value="remoto">Remoto</option>
                    </select>
                    <select id="contract-filter" name={idContract} aria-label="Tipo de contrato" defaultValue={initialFilterValue.contract}>
                        <option value="" >Tipo de contrato</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                    </select>
                    <select id="experience-filter" name={idExp} aria-label="Nivel de experiencia" defaultValue={initialFilterValue.idExp}>
                        <option value=""  >Nivel de experiencia</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                        <option value="engineer">Engineer</option>
                        <option value="senior engineer">Senior engineer</option>
                    </select>
                    <input type="submit" value="Filtrar" hidden />
                    <button type='button' id="button-clear" onClick={handleClear}>Limpiar</button>
                </div>
            </form>
        </section>
    )
}