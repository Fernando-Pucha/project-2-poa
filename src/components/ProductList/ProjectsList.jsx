import { Link } from 'react-router-dom'
import './ProjectsList.css'

export default function ProjectsList({ FrontApiURL,project }) {


    return (
        <div className='ProjectsList'>
            <Link to={`${FrontApiURL}${project.id}`} style={{ textDecoration: 'none' }}>
                <article  className='Project'>
                    <h3>{project.titulo}</h3>
                    <p>{project.fechaInicio}</p>
                    <p>{project.fechaFin}</p>
                    <p>{project.responsable}</p>
                    <p>{project.prioridad}</p>
                </article>
            </Link>
            <div className='Projectsbuttons'>
                <button /* onClick={() => buttonDelete(project.id)} */>Delete</button>
                <button /* onClick={() => buttonDelete(project.id)} */>Edit</button>
            </div>
        </div>
    )
}