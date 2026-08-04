import styles from './pagination.module.css'

import type { PaginationProps} from "./types.ts"


export function Pagination({currentPage = 1,totalPages = 5, onPageChange} : PaginationProps ){
    const pagesNav=Array.from({length : totalPages},(_,index) => index+1)
    const firstPage = currentPage === 1 
    const lastPage = currentPage === totalPages
    const stylefirstPage = firstPage ? styles.disabledNav : ''
    const styleLastPage = lastPage ? styles.disabledNav : ''
    const prevClick= (event : React.MouseEvent<HTMLElement> ) => {
        event.preventDefault();
        if(!firstPage)
        {
            onPageChange(currentPage- 1);
        }
    }
    const changeClick= (event : React.MouseEvent<HTMLElement>,page : number) => {
        event.preventDefault()   
         if(currentPage != page){
            onPageChange(page);
         }
    }
    const nextClick= (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if(!lastPage)
        {
            onPageChange(currentPage+ 1);
        }
    }
    const buildUrlhref = (page : number) => {
        const url = new URL(window.location.href)
            url.searchParams.set('page',page.toString())
        return `${url.pathname}?${url.searchParams.toString()}`
    } 
    return (
        <nav id ="pagination"aria-label="Barra de navegacion de resultados" className={styles.pagination}>
            <a href={buildUrlhref(currentPage-1)} aria-label="Página anterior" className = {stylefirstPage} onClick={prevClick}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
            </a>
            {pagesNav.map(page => (
                <a
                    onClick ={ (event) => changeClick(event,page)}
                href={buildUrlhref(page)}
                    key = {page}
                    className= {currentPage === page ? styles.isActive : styles.pageLink}>
                        {page}

                    </a>

            ))}
            <a href={buildUrlhref(currentPage+1)} aria-label="Página siguiente" className = {styleLastPage} onClick={nextClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
            </a>
        </nav>
    );
}