import './ProjectsPage.css';
import ProjectsList from '../../components/ProjectsList/ProjectsList';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const apiURL = `${import.meta.env.VITE_BACK_URL}/projects`;
const FrontApiURL = `${import.meta.env.VITE_FRONT_URL}/projects`;

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [filtroPrioridad, setFiltroPrioridad] = useState("");

    useEffect(() => {
        axios
            .get(apiURL)
            .then(res => setProjects(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='ProjectsPage'>
            <div className="ProjectsPageTitulo">
                <h2> Proyectos POA </h2>
                <Link to="/projects/addProject">
                    <button className="btnAgregar">Añadir Proyecto</button>
                </Link>
            </div>

            <div className='Encabezado'>
                <p>Nombre</p>
                <p>Fecha Inicio</p>
                <p>Fecha Fin</p>
                <p>Responsable</p>               
                <div className="FiltroEstado">
                    <label>Prioridad</label>
                    <select className="FiltroEstadoSelect" value={filtroPrioridad} onChange={(e) => setFiltroPrioridad(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>
                <p>Estado</p>
            </div>

            {projects.length > 0 ? (
                projects
                    .filter(project => filtroPrioridad === "" || project.prioridad === filtroPrioridad)
                    .map(project => (
                        <ProjectsList key={project.id} FrontApiURL={FrontApiURL} project={project} />
                    ))
            ) : (
                <p>No projects to show</p>
            )}
        </div>
    );
}
