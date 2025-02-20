import { useEffect, useState } from "react";
import axios from "axios";
import ActivityList from '../../components/ActivityList/ActivityList';

const apiURL = `${import.meta.env.VITE_BACK_URL}/actividades`
const FrontApiURL = `${import.meta.env.VITE_FRONT_URL}/projects`

export default function ActivitiesPage() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios
            .get(apiURL)
            .then(res => setActivities(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='ProjectsPage'>
            <div className="ProjectsPageTitulo">
                <h2> Actividades de los Proyectos POA </h2>
            </div>
            <div className='Encabezado'>
                <p>Name</p>
                <p>Fecha Inicio</p>
                <p>Fecha Fin</p>
                <p>Descripción</p>
                <p>Proyecto</p>
                <p>Estado</p>
            </div>
            {activities.length > 0 ?
                activities.map(activity =>
                    <ActivityList key={activity.id} FrontApiURL={FrontApiURL} activity={activity} />
                ) : <p>No projects to show</p>
            }
        </div>
    )
}