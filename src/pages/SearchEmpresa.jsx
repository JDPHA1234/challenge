import { useEffect } from 'react'
import { Form } from '../components/Form.jsx'
import { JobListing } from '../components/JobListing.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { Spinner } from '../components/Spinner.jsx'
import { useFilters } from '../hooks/useFilters.jsx'
import { NavLink } from 'react-router'
export default function Search() {
    return (
    <main className="search-main">
         <section className="search-section">
            <h1>Empresas Asociadas con DevJobs</h1>
            <form role="search"  className='searchForm' >
                <div className={`form-search   formSearchDiv`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    <input id="jobs-input-search" o type="text" placeholder="Buscar trabajos,empresas o habilidades"/>
                </div>
            </form>
        </section>
        <section className="search-result">
            <h3>Resultados de busqueda</h3>
            <article className='result-search'>
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Logo de Google"/>
            <div>
            <NavLink  className='titleLink'>Google</NavLink>
            </div>
            <small>Madrid,Barcelona</small>
            <p>NextGen Technologies es una empresa innovadora que desarrolla productos digitales de vanguardia. 
                Valoramos el liderazgo, la innovación y el pensamiento estratégico. Ofrecemos un ambiente dinámico con
                oportunidades de crecimiento y desarrollo profesional.</p>
        </article>
        </section>
    </main>)
}