import './ProjectsPage.css'
import ProjectsList from '../../components/ProductList/ProjectsList';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const apiURL = `${import.meta.env.VITE_BACK_URL}/projects`
const FrontApiURL = `${import.meta.env.VITE_FRONT_URL}/projects`

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get(apiURL)
            .then(res => setProjects(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='ProjectsPage'>
            <div className="ProjectsPageTitulo">
                <h2> Proyectos POA </h2>
                <Link to="/projects/addProject">
                    <button className="btnAgregar">Añadir Proyectos</button>
                </Link>
            </div>
            <div className='Encabezado'>
                <p>Name</p>
                <p>Fecha Inicio</p>
                <p>Fecha Fin</p>
                <p>Responsable</p>
                <p>Prioridad</p>
                <p>Estado</p>
            </div>
            {projects.length > 0 ?
                projects.map(project =>
                    <ProjectsList key={project.id} FrontApiURL={FrontApiURL} project={project} />
                ) : <p>No projects to show</p>
            }
        </div>
    )
}