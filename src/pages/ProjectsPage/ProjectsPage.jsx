import './ProjectsPage.css'
import ProjectsList from '../../components/ProductList/ProjectsList';
import { useEffect, useState } from "react";
import axios from "axios";

const apiURL = "http://localhost:5005/projects/";

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
            <div>
                <h2> Proyectos POA </h2>
                <button>Agregar</button>
            </div>
            <div className='Encabezado'>
                <p>Name</p>
                <p>Fecha Inicio</p>
                <p>Fecha Fin</p>
                <p>Responsable</p>
            </div>
            {projects.length > 0 ?
                projects.map(project =>
                    <ProjectsList project={project} />
                ) : <p>No projects to show</p>
            }
        </div>
    )
}