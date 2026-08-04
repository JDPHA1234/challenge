import { useEffect } from 'react'
import { Form } from '../components/Form.js'
import { JobListing } from '../components/JobListing.js'
import { Pagination } from '../components/Pagination.js'
import { Spinner } from '../components/Spinner.js'
import { useFilters } from '../hooks/useFilters.js'
export default function  Search() {
    
    const {jobs, handleFilters, handleTextFilter, handleReset, currentPage, setCurrentPage, totalPages,loading, error, textSearch, filters} = useFilters()
    const condition = loading ? <Spinner/> : error ? <p className="loginError">{error.message}</p> : <JobListing joblist={jobs} /> 
    useEffect( () => {
        document.title = `Resultados : Pagina ${currentPage}`
    }, [currentPage])
    return (<main className="search-main">
        <Form onSearch={handleFilters} onChangeText={handleTextFilter} onReset={handleReset} initialValue={textSearch} initialFilterValue={filters}/>
        <section className="search-result">
            <h3>Resultados de busqueda</h3>
            {condition}
            {!error && !loading ? <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> : null}
        </section>
    </main>)
}