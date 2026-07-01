import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase-client.js';
import { Spinner } from '../components/Spinner.jsx';

export default function EmpresasPage() {
    const [empresas, setEmpresas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEmpresas() {
            try {
                setIsLoading(true);
                setError(null);
                // Hacemos la llamada a tu tabla Empresa
                const { data, error } = await supabase
                    .from('Empresa')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                
                setEmpresas(data || []);
            } catch (error) {
                setEmpresas([]);
                setError(error.message);
                console.error("Error al cargar las empresas:", error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEmpresas();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="empresas-loading">{error}</div>;
    }

    return (
        <div className="empresas-container">
            <header className="empresas-header">
                <h1>Empresas Asociadas con Devjobs</h1>
            </header>

            <main className="empresas-grid">
                {empresas.map((empresa) => (
                    <article key={empresa.id} className="empresa-card">
                        <div className="empresa-card-header">
                            <img 
                                src={empresa.logo_url || 'https://via.placeholder.com/48'} 
                                alt={`Logo de ${empresa.nombre}`} 
                                className="empresa-logo" 
                            />
                            <div className="empresa-info-top">
                                <h2>{empresa.nombre}</h2>
                                <div className="empresa-badges">
                                    <span className="badge badge-primary">SOFTWARE</span>
                                    <span className="badge badge-secondary">{empresa.cant_empleados} empleados</span>
                                </div>
                            </div>
                        </div>

                        <p className="empresa-descripcion">
                            {empresa.descripcion}
                        </p>

                        <div className="empresa-card-footer">
                            <div className="empresa-ubicacion">
                                {/* SVG del pin de ubicación (como en la imagen) */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                </svg>
                                <span>{empresa.ubicacion}</span>
                            </div>
                            
                            <Link to={`/companie/${empresa.id}`} className="empresa-link">
                                Ver más
                            </Link>
                        </div>
                    </article>
                ))}
            </main>
        </div>
    );
}