import { useEffect } from 'react'
import { Form } from '../components/Form.jsx'
import { JobListing } from '../components/JobListing.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { Spinner } from '../components/Spinner.jsx'
import { useFilters } from '../hooks/useFilters.jsx'
export default function  Search() {
    
    const {jobs, handleFilters, handleTextFilter, handleReset, currentPage, setCurrentPage, totalPages,loading, textSearch, filters} = useFilters()
    const condition = loading ? <Spinner/> : <JobListing joblist={jobs} /> 
    useEffect( () => {
        document.title = `Resultados : Pagina ${currentPage}`
    }, [currentPage])
    return (<main className="search-main">
        <Form onSearch={handleFilters} onChangeText={handleTextFilter} OnReset={handleReset} initialValue={textSearch} initialFilterValue={filters}/>
        <section className="search-result">
            <h3>Resultados de busqueda</h3>
            {condition}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </section>
    </main>)
}