import { useState, useEffect } from 'react'
import { Form } from '../components/Form.jsx'
import { JobListing } from '../components/JobListing.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { Spinner } from '../components/Spinner.jsx'
import {useRouter} from '../hooks/useRouter.jsx'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../supabase-client.js'
function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(() =>{
        const pageNumber = Number(searchParams.get('page'))
        return Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber
    });
    const [textSearch, setTextSearch] = useState(() =>  searchParams.get('text') || '' );
    const [filters, setFilters] = useState(() =>{
        const filter = {
            tech : searchParams.get('technology') || '',
            location : searchParams.get('type') || '',
            contract : searchParams.get('modalidad') || '',
            idExp : searchParams.get('level') || '',
        }
        return filter;
    })
    const handleFilters = (filters) => {
        setFilters(filters);
        setCurrentPage(1);
    }
    const handleTextFilter = (text) => {
        setTextSearch(text);
        setCurrentPage(1);
    }
    const handleReset = () => {
        setFilters({
            tech: '',
            location: '',
            contract: '',
            idExp: ''
        })
        setTextSearch('')
        setCurrentPage(1);
    }
    const itemsforPage = 4;
    const [total,setTotal] = useState(0)
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect( () => {
        async function getJobs() {
        try {
            setLoading(true);
            let query = supabase
                .from('Jobs')
                .select('*', { count: 'exact' });

            if (textSearch) query = query.ilike('titulo', `%${textSearch}%`);
            if (filters.tech) query = query.eq('technology', filters.tech);
            if (filters.location) query = query.eq('ubicacion', filters.location);
            if (filters.contract) query = query.eq('modalidad', filters.contract);
            if (filters.idExp) query = query.eq('nivel', filters.idExp);

            // 3. Paginación
            const from = (currentPage - 1) * itemsforPage;
            const to = from + itemsforPage - 1;
            query = query.range(from, to);

            // 4. Ejecución
            const { data, error, count } = await query;

            if (error) throw error;

            // 5. Actualizamos los estados
            setTotal(count);
            setJobs(data);
        } catch (error) {
            console.error('Error fetching de datos', error);
        } finally {
            setLoading(false);

        }
    }
    getJobs()
    },[filters,textSearch,currentPage])
    const totalPages = Math.ceil(total / itemsforPage)
    useEffect(() => {
        setSearchParams((params) => {
        
        if(textSearch) params.set('text',textSearch)
            else params.delete('text')
        if(filters.tech) params.set('technology',filters.tech)
                else params.delete('technology')
        if(filters.location) params.set('type',filters.location)
                else params.delete('type')
        if(filters.contract) params.set('modalidad',filters.contract)
                else params.delete('modalidad')
        if(filters.idExp) params.set('level',filters.idExp)
                else params.delete('level')
        if(currentPage > 1) params.set('page',currentPage)
                else params.delete('page')
        return params
        })
    },[filters,textSearch,currentPage,setSearchParams])
    return {
        jobs,
        total,
        textSearch,
        handleFilters,
        handleTextFilter,
        handleReset,
        currentPage,
        setCurrentPage,
        totalPages,
        loading,
        filters
    }
}
export default function Search() {
    const {jobs, handleFilters, handleTextFilter, handleReset, currentPage, setCurrentPage, totalPages,loading, textSearch, filters} = useFilters()
    const condition = loading ? <Spinner/> : <JobListing joblist={jobs} /> 
    useEffect(() => {
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