import { useEffect, useState } from "react";
import axios from "axios";
import ActivityList from '../../components/ActivityList/ActivityList';

const apiURL = `${import.meta.env.VITE_BACK_URL}/actividades`;
const FrontApiURL = `${import.meta.env.VITE_FRONT_URL}/projects`;

export default function ActivitiesPage() {
    const [activities, setActivities] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState("");

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
                <p>Nombre</p>
                <p>Fecha Inicio</p>
                <p>Fecha Fin</p>
                <p>Descripción</p>
                <p>Proyecto</p>
                <div className="FiltroEstado">
                    <label>Estado: </label>
                    <select className="FiltroEstadoSelect" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Terminado">Terminado</option>
                    </select>
                </div>
            </div>
            {activities.length > 0 ? (
                activities
                    .filter(activity => filtroEstado === "" || activity.estado === filtroEstado)
                    .map(activity => (
                        <ActivityList key={activity.id} FrontApiURL={FrontApiURL} activity={activity} />
                    ))
            ) : (
                <p>No activities to show</p>
            )}
        </div>
    )
}