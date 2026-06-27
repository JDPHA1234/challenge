import {useState,useId} from 'react'
export default function FormPerfil(){
    const idName = useId();
    const idEmail = useId();
    const idLocation =useId();
    const idAboutMe= useId();
    const [isEditing,setEditingMode] = useState(false)
    const textButton = isEditing ? 'Editar' : 'Guardar Cambios'
    const input = isEditing ? '' : 'isDisabled'
    const typebutton = isEditing ? 'submit' : 'button'
    const handleClick = () => {
        setEditingMode(!isEditing)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const personalInfo = {
            Name : formData.get(idName),
            Email : formData.get(idEmail),
            Location : formData.get(idLocation),
            AboutMe : formData.get(idAboutMe)
        }
        
    }
    return (
         <div className="appConteiner">
    <aside>
        <nav className="navAside">
            <ul>
            <li><a href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M10 12h4v4h-4l0 -4" /></svg>Inicio</a></li>
            <li><a href="#" className="isActive"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>Mi perfil

            </a></li>
            <li><a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
            Mis candidaturas
            </a></li>
            </ul>
        </nav>
    </aside>
    <main className ="mainForm">
        <div className="formTitle">
        <h1>Mi perfil</h1>
        <p>Actualiza tu informacion personal y profesional</p>
        </div>
        <form className="formUser" onSubmit={handleSubmit}>
            <h3>Informacion personal</h3>
            <div className="formInfoDiv">
                <div>
            <label for="Nombre-input">Nombre</label>
            <input type="text" name={idName} className={input}/>
            </div>
            <div>
            <label for="Correo-input">Correo Electronico</label>
            <input type="email"  name={idEmail}/>
            </div>
            <div>
            <label for="ubicacion-input">Ubicacion</label>
            <input type="text"  name={idLocation}/>
            </div>
            <div
            id="sobreMiInput">
            <label for="sobreMiInput">Sobre mi</label>
            <input type="text" name={idAboutMe}/>
            </div>
            </div>
            <div className="formInfoExp">
            <h3>Experiencia</h3>
            <div>
            <label for="Cargo-input">Cargo</label>
            <input type="text" name="cargoForm"/>
            </div>
            <div>
            <label for="Empresa-input">Empresa</label>
            <input type="text" name="cargoForm"/>
            </div>  
            <div>
            <label for="experience-input">Años de experencia</label>
            <input type="text" name="expForm"/>
            </div>
            </div>
            <div className="habilityDiv">
                <h3>Habilidades</h3>
                <ul>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Python</li>
                </ul>   
            </div>
            <div className="cvDiv">
                <h3>CV</h3>
                <label id="CvUpload">
                    <input type="file" accept=".pdf,.doc,.docx" hidden/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cloud-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><path d="M9 15l3 -3l3 3" /><path d="M12 12l0 9" /></svg>
                    <p><strong>Sube tu CV</strong> o arrastra y suelta </p>
                    <p>PDF,DOC,DOCX,(MAX 5MB)</p>
                    
                </label>

            </div>
            <div className="buttonDiv">
            <button type={typebutton} onClick ={handleClick}>{textButton}</button>
            </div>
        </form>


    </main>
    </div>
    )
}