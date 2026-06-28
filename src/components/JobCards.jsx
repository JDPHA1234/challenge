import { useState, useEffect } from 'react' // Asegúrate de importar useEffect
import { Link } from 'react-router-dom'
import { useAuthStore } from "../store/authStore.js"
import { supabase } from '../supabase-client.js'

export function JobCard({ jobs }) {
    // 1. Obtenemos 'isLoggedIn' y el 'user' completo desde tu store
    const { isLoggedIn, user } = useAuthStore() 
    const [loading, setLoading] = useState(true) // Estado para manejar la carga de la solicitud
    const [isApplied, setApplied] = useState(false)

    // 2. VERIFICAR AL CARGAR: Revisamos si ya existe la solicitud en la base de datos
    useEffect(() => {
        async function checkApplication() {
            // Si no está logueado o no hay usuario, no hacemos la consulta
            if (!isLoggedIn || !user) return; 

            try {
                const { data, error } = await supabase
                    .from('Solicitud')
                    .select('id') // Solo pedimos el ID para que sea más rápido
                    .eq('idTrabajo', jobs.id)
                    .eq('idUsuario', user.id)
                    .maybeSingle(); // maybeSingle no da error si no encuentra nada

                if (error) throw error;
                
                // Si la consulta devuelve data, significa que ya aplicó
                if (data) {
                    setApplied(true);
                }
            } catch (error) {
                console.error('Error verificando el estado de la solicitud:', error.message);
            }finally {
                setLoading(false); // Terminamos la carga
            }
        }   
        checkApplication();
    }, [jobs.id, user, isLoggedIn]); // Se vuelve a ejecutar si el idTrabajo o el usuario cambian

    // 3. ACCIÓN AL HACER CLIC: Insertar la nueva solicitud
    const handleClick = async () => {
        if (!user) return; // Validación de seguridad extra
        setLoading(true); // Iniciamos la carga mientras hacemos la solicitud
        const solicitud = {
            idTrabajo: jobs.id, 
            idUsuario: user.id, // Sacamos el ID directamente del user del store
            status: "pendiente",
            cvSolicitud_url: "https://tudominio.com/ruta-al-cv.pdf" // Recuerda cambiar esto por el real
        };

        try {
            const { data, error } = await supabase
                .from('Solicitud')
                .insert(solicitud)
                .select() 
                .single();
                
            if (error) {
                throw new Error(error.message);
            }

            console.log("Solicitud insertada con éxito:", data);
            setApplied(true); // Cambiamos el estado para que el botón se actualice

        }catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }finally {
            setLoading(false); // Terminamos la carga  
        }
    }

    // 4. Variables calculadas para el render
    const text = isApplied ? 'Aplicado' : 'Aplicar'
    const classButton = isApplied ? 'button-apply-job' : ''
    return (
        <article className='result-search'
            data-modalidad={"full-time"}
            data-tecnologia={jobs?.technology}
            data-location={jobs?.ubicacion}
            data-experience={jobs?.nivel}>
            <div>
                <Link to={`/details/${jobs.id}`} className='titleLink'>{jobs.titulo}</Link>
                {isLoggedIn && (
                    <button disabled={isApplied || loading} className={classButton} onClick={handleClick}>
                        {text}
                    </button>
                )}
            </div>
            <small>{jobs?.Empresa?.nombre} | {jobs?.modalidad} ({jobs?.ubicacion})</small>
            <p className='descriptionSearch'>{jobs?.descripcion}</p>
        </article>
    )
}
