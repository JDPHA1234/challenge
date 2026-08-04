import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AsideProfile } from '../components/AsideProfile.js'
import { useAuthStore } from '../store/authStore.js'
import { supabase } from '../supabase-client.js'
import { useId } from 'react'
export default function FormPerfil() {
    const { user } = useAuthStore(); // Obtenemos el usuario logueado
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [cv, setCv] = useState<File | null>(null); 
    const idName = useId();
    const location = useLocation();
    const [perfil, setPerfil] = useState({
        nombre: '',
        email: '',
        ubicacion: '',
        sobre_mi: '',
        cargo: '',
        empresa: '',
        experiencia: '',
        avatar_url: '',
        cv_url: '',
    });

    // 1. CARGAR DATOS AL INICIAR
    useEffect(() => {
        async function fetchProfile() {
            if (!user) {
                setError('Debes iniciar sesión para ver tu perfil.')
                setIsLoading(false)
                return;
            }

            try {
                setError(null)
                const { data, error } = await supabase
                    .from('usuario') 
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (data) {
                    setPerfil({
                        nombre: data.nombre || '',
                        email: data.email || '',
                        ubicacion: data.ubicacion || '',
                        sobre_mi: data.sobre_mi || '',
                        cargo: data.cargo || '',
                        empresa: data.empresa || '',
                        experiencia: data.experiencia || '',
                        avatar_url: data.avatar_url || '',
                        cv_url: data.cv_url || ''
                    });
                }
            } catch (error) {
                setError((error as Error).message)
                console.error("Error al cargar el perfil:",Error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, []);
    const handleFileChangeImage = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setProfileImage(event.target.files[0])
        }
    }
    const handleFileChangePDF = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setCv(event.target.files[0])
        }
    }
    const uploadcv = async (file : File) => {
        const fileExt = file.name.split('.').pop();

        const fileName = `${Date.now()}.${fileExt}`;

        const filePath = `${user.id}/${fileName}`;
        const { error } = await supabase.storage
            .from('PDFs')
            .upload(filePath, file)

        if (error) {
            throw new Error(`Error subiendo el PDF: ${error.message}`)
        }
        const { data } = await supabase.storage.from('PDFs').getPublicUrl(filePath)
        if (!data?.publicUrl) {
            throw new Error('No se pudo obtener la URL pública del CV.')
        }
        return data.publicUrl
    }
    const uploadProfileImage = async (file : File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const filePath = `${user.id}/${fileName}`;
        const { error } = await supabase.storage
            .from('profileimages')
            .upload(filePath, file)

        if (error) {
            throw new Error(`Error subiendo la imagen: ${error.message}`)
        }
        const { data } = await supabase.storage.from('profileimages').getPublicUrl(filePath)
        if (!data?.publicUrl) {
            throw new Error('No se pudo obtener la URL pública de la imagen.')
        }
        return data.publicUrl
    }
    // 2. ENVIAR LOS DATOS ACTUALIZADOS
    const handleSubmit = async (event : React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            setError('Debes iniciar sesión para guardar cambios.')
            return
        }

        setIsSaving(true)
        setError(null)


        const formData = new FormData(event.currentTarget);

        try {
            let imageurl = perfil.avatar_url
            if (profileImage) {
                imageurl = await uploadProfileImage(profileImage);
            }
            let cvurl = perfil.cv_url
            if (cv) {
                cvurl = await uploadcv(cv);
            }


            const updates = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                ubicacion: formData.get('ubicacion'),
                sobre_mi: formData.get('sobre_mi'),
                cargo: formData.get('cargo'),
                empresa: formData.get('empresa'),
                experiencia: formData.get('experiencia'),
                avatar_url: imageurl,
                cv_url: cvurl
            };
            console.log("Enviando datos actualizados:", updates);
            const { error, data } = await supabase
                .from('usuario')
                .update(updates)
                .eq('id', user.id)
                .select('*')
                .single()
            if (error) throw error;
            alert('Perfil actualizado con éxito');
            setIsEditing(false); 
            setPerfil(data || updates); 

        } catch (error) {
            setError((error as Error).message)
            console.error("Error al actualizar:", error);
            alert('Hubo un error al guardar los cambios');
        } finally {
            setIsSaving(false)
        }
    };
    useEffect(() => {

        if (!isLoading && location.hash === '#seccion-cv') {
            const elemento = document.getElementById('seccion-cv');

            if (elemento) {
                setTimeout(() => {
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    }, [isLoading, location.hash]);
    // Lógica dinámica para la UI
    if (isLoading) return <div className="appConteiner"><p>Cargando perfil...</p></div>;
    if (error) {
        return (
            <div className="appConteiner">
                <AsideProfile />
                <main className="mainForm">
                    <div className="formTitle">
                        <h1>Mi perfil</h1>
                        <p>Actualiza tu información personal y profesional</p>
                        <p className="loginError">{error}</p>
                    </div>
                </main>
            </div>
        )
    }
    const avatarSrc = profileImage
        ? URL.createObjectURL(profileImage)
        : (perfil.avatar_url || 'https://via.placeholder.com/150?text=Avatar');
    return (
        <div className="appConteiner">
            <AsideProfile />
            <main className="mainForm">
                <div className="formTitle">
                    <h1>Mi perfil</h1>
                    <p>Actualiza tu información personal y profesional</p>
                    {error ? <p className="loginError">{error}</p> : null}
                </div>

                <form className="formUser" onSubmit={handleSubmit}>
                    <h3>Información personal</h3>
                    <div className="formInfoDiv">
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" id={idName} defaultValue={perfil.nombre} disabled={!isEditing} />
                        </div>
                        <div>
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" name="email" id="email" defaultValue={perfil.email} disabled={!isEditing} />
                        </div>
                        <div>
                            <label htmlFor="ubicacion">Ubicación</label>
                            <input type="text" name="ubicacion" id="ubicacion" defaultValue={perfil.ubicacion} disabled={!isEditing} />
                        </div>
                        <div>
                            <label htmlFor="sobre_mi">Sobre mí</label>
                            <input type="text" name="sobre_mi" id="sobre_mi" defaultValue={perfil.sobre_mi} disabled={!isEditing} />
                        </div>
                    </div>

                    <div className="formInfoExp">
                        <h3>Experiencia</h3>
                        <div>
                            <label htmlFor="cargo">Cargo</label>
                            <input type="text" name="cargo" id="cargo" defaultValue={perfil.cargo} disabled={!isEditing} />
                        </div>
                        <div>
                            <label htmlFor="empresa">Empresa</label>
                            <input type="text" name="empresa" id="empresa" defaultValue={perfil.empresa} disabled={!isEditing} />
                        </div>
                        <div>
                            <label htmlFor="experiencia">Años de experiencia</label>
                            <input type="text" name="experiencia" id="experiencia" defaultValue={perfil.experiencia} disabled={!isEditing} />
                        </div>
                    </div>
                    <div className="avatarUploadDiv">
                        <h3>Imagen de Perfil</h3>
                        <label
                            htmlFor="IMAGEN"
                            className={`avatar-label ${!isEditing ? 'disabled' : ''}`}
                            style={{ opacity: isEditing ? 1 : 0.7, cursor: isEditing ? 'pointer' : 'not-allowed' }}
                        >
                            <div className="avatar-preview">
                                {/* Aquí mostramos la imagen real o la vista previa */}
                                <img src={avatarSrc} alt="Perfil" className="avatar-img" />

                                {/* Este overlay oscuro con la cámara solo aparece si estamos editando */}
                                {isEditing && (
                                    <div className="avatar-overlay">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                                            <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                        </svg>
                                        <span>Cambiar</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                name="IMAGEN"
                                accept="image/*"
                                id="IMAGEN"
                                hidden
                                disabled={!isEditing}
                                onChange={handleFileChangeImage}
                            />
                        </label>
                    </div>

                    <div className="cvDiv" id="seccion-cv">
                        <h3>CV</h3>
                        <label id="CvUpload" style={{ opacity: isEditing ? 1 : 0.5, cursor: isEditing ? 'pointer' : 'not-allowed' }}>
                            <input type="file" accept=".pdf,.doc,.docx" hidden disabled={!isEditing} onChange={handleFileChangePDF} />
                            {/* SVG del icono */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><path d="M9 15l3 -3l3 3" /><path d="M12 12l0 9" /></svg>
                            <p><strong>Sube tu CV</strong> o arrastra y suelta</p>
                            <p>PDF, DOC, DOCX (MAX 5MB)</p>
                        </label>
                    </div>

                    <div className="buttonDiv">
                        {!isEditing ? (
                            /* Modo Lectura: Botón estrictamente configurado como "button" */
                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={(e) => {
                                    e.preventDefault(); // Detiene cualquier intento de envío accidental
                                    setIsEditing(true);
                                }}
                            >
                                Editar
                            </button>
                        ) : (
                            /* Modo Edición: Botones para Guardar (submit) y Cancelar */
                            <>
                                <button type="submit" disabled={isSaving}>
                                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    disabled={isSaving}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancelar
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
}