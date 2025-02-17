import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiURL = "http://localhost:5005/projects/";

export default function DetailsProjectList() {
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
                    <div className="DetailsProject">
                        <h2>{project.titulo}</h2>
                        <p>{project.descripcion}</p>
                        <p>{project.estado}</p>
                        <p>{project.prioridad}</p>
                    </div>
                    {
                        project?.actividades?.map(actividad =>
                            <article key={actividad.id} className='DetailsProjectActividad'>
                                <h3>{actividad.titulo}</h3>
                                <p>{actividad.descripción}</p>
                                <p>{actividad.fechaInicio}</p>
                                <p>{actividad.fechaFin}</p>
                                <p>{actividad.estado}</p>
                            </article>
                        )
                    }
                </>
            }

        </div>
    )

}