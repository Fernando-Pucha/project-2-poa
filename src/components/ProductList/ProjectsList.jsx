import { Link } from 'react-router-dom'
import './ProjectsList.css'

export default function ProjectsList({ project }) {


    return (
        <div className='ProjectsList'>
            <Link to={`http://localhost:5173/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                <article key={project.id} className='Project'>
                    <h3>{project.titulo}</h3>
                    <p>{project.fechaInicio}</p>
                    <p>{project.fechaFin}</p>
                    <p>{project.responsable}</p>
                </article>
            </Link>
        </div>
    )
}