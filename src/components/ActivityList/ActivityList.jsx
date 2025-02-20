import { Link } from 'react-router-dom'

export default function ActivityList({ FrontApiURL, activity }) {
    
    return (
        <div className='ProjectsList'>
            <article className='Project'>
                <h3>{activity.titulo}</h3>
                <p>{activity.fechaInicio}</p>
                <p>{activity.fechaFin}</p>
                <p>{activity.descripcion}</p>
                <p>{activity.projectId}</p>
                <p>{activity.estado}</p>
                <div className='Projectsbuttons'>
                    <Link to={`${FrontApiURL}/${activity.projectId}`} style={{ textDecoration: 'none' }}>
                        <button className='ProjectsButtonDetalles'>+ Detalles</button>
                    </Link>
                </div>
            </article>
        </div>
    )
}