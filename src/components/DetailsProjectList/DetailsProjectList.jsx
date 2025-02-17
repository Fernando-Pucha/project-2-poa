import './DetailsProjectList.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailsProjectList({ apiURL }) {
    const { projectId } = useParams();

    const [project, setProject] = useState({})

    useEffect(() => {
        axios
            .get(`${apiURL}${projectId}?_embed=actividades`)
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }, [projectId])



    return (
        <div className="DetailsProjectList">
            {
                project && <>
                <div>
                <div className="DetailsProject">
                        <h2>{project.titulo}</h2>
                        <p>{project.descripcion}</p>
                        <p>{project.estado}</p>
                        <p>{project.prioridad}</p>
                    </div>
                    <button>Add Activity</button>
                </div>
                    
                    {
                        project?.actividades?.map(actividad => <div key={actividad.id} className='DetailsProjectActividades'>
                            <article  className='DetailsProjectActividad'>
                                <h3>{actividad.titulo}</h3>
                                <p>{actividad.descripcion}</p>
                                <p>Fecha Inicio: {actividad.fechaInicio}</p>
                                <p>Fecha Fin: {actividad.fechaFin}</p>
                                <p>Estado: {actividad.estado}</p>
                            </article>
                            <div className='DetailsProjectButton'>
                                <button /* onClick={() => buttonDelete(project.id)} */>Delete</button>
                                <button /* onClick={() => buttonDelete(project.id)} */>Edit</button>
                            </div>
                        </div>
                        )
                    }
                </>
            }

        </div>
    )

}