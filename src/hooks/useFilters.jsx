import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../supabase-client.js'
export function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(() => {
        const pageNumber = Number(searchParams.get('page'))
        return Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber
    });
    const [textSearch, setTextSearch] = useState(() => searchParams.get('text') || '');
    const [filters, setFilters] = useState(() => {
        const filter = {
            tech: searchParams.get('technology') || '',
            mod: searchParams.get('modalidad') || '',
            idExp: searchParams.get('exp') || '',
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
            mod: '',
            idExp: ''
        })
        setTextSearch('')
        setCurrentPage(1);
    }
    const itemsforPage = 6;
    const [total, setTotal] = useState(0)
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getJobs() {
            try {
                setLoading(true);
                let query = supabase
                    .from('Trabajo')
                    .select(`
                id,
                titulo,
                ubicacion,
                descripcion,
                modalidad,
                Empresa!inner (
                    nombre
                )
                `, { count: 'exact' })
                if (textSearch) query = query.or(`titulo.ilike.%${textSearch}%,descripcion.ilike.%${textSearch}%`)
                if (filters.tech) query = query.contains('technology', [filters.tech])
                if (filters.mod) query = query.ilike('modalidad', `%${filters.mod}%`)
                if (filters.idExp) query = query.ilike('nivel', `%${filters.idExp}%`)

                // 3. Paginación
                const from = (currentPage - 1) * itemsforPage
                const to = from + itemsforPage - 1
                query = query.range(from, to)
                
                // 4. Ejecución
                const { data, error, count } = await query
                if (error) throw error

                // 5. Actualizamos los estados
                setTotal(count)
                setJobs(data)
            } catch (error) {
                console.error('Error fetching de datos', error);
            } finally {
                setLoading(false);

            }
        }
        getJobs()
    }, [filters, textSearch, currentPage])
    
    const totalPages = Math.ceil(total / itemsforPage)
    useEffect(() => {
        setSearchParams((params) => {

            if (textSearch) params.set('text', textSearch)
            else params.delete('text')
            if (filters.tech) params.set('technology', filters.tech)
            else params.delete('technology')
            if (filters.mod) params.set('modalidad', filters.mod)
            else params.delete('modalidad')
            if (filters.idExp) params.set('exp', filters.idExp)
            else params.delete('exp')
            if (currentPage > 1) params.set('page', String(currentPage))
            else params.delete('page')
            return params
        })
    }, [filters, textSearch, currentPage, setSearchParams])
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