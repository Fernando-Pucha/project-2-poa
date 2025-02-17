import './DetailsProjectList.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

export default function DetailsProjectList({ apiURL }) {
    const { projectId } = useParams();

    const [project, setProject] = useState({})
    
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${apiURL}/${projectId}?_embed=actividades`)
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }, [projectId])

    const deleteProject = () => {
        const isConfirmed = window.confirm("¿Está seguro de eliminar el proyecto? \n Recuerda que al borrar un proyecto se borra todas las actividades")

        if (isConfirmed) {
            axios
                .delete(`${apiURL}/${projectId}`)
                .then(() => {
                    navigate("/projects");
                })
                .catch((err) => console.log(err));
        }
    };

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
                        <button onClick={deleteProject}>Delete Project</button>
                    <button >Edit Project</button>
                    </div>

                    {
                        project?.actividades?.map(actividad => <div key={actividad.id} className='DetailsProjectActividades'>
                            <article className='DetailsProjectActividad'>
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