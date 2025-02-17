import { Link } from 'react-router-dom'
import './ProjectsList.css'

export default function ProjectsList({ FrontApiURL, project }) {
    
    return (
        <div className='ProjectsList'>
            <article className='Project'>
                <h3>{project.titulo}</h3>
                <p>{project.fechaInicio}</p>
                <p>{project.fechaFin}</p>
                <p>{project.responsable}</p>
                <p>{project.prioridad}</p>
                <div className='Projectsbuttons'>
                    <Link to={`${FrontApiURL}/${project.id}`} style={{ textDecoration: 'none' }}>
                        <button>+ Detalles</button>
                    </Link>
                </div>
            </article>

        </div>
    )
}