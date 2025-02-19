import './DetailsProjectList.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const apiURL = "http://localhost:5005/projects"

export default function DetailsProjectList() {
    
    const { projectId } = useParams();
    const [project, setProject] = useState({})

    const navigate = useNavigate();

    const getInitialProject = () => {
        axios
            .get(`${apiURL}/${projectId}?_embed=actividades`)
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getInitialProject()
    }, [projectId])

    const deleteProject = () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este proyecto?  \n Ten en cuenta que al eliminarlo, también se eliminarán todas las actividades asociadas a él.")

        if (isConfirmed) {
            axios
                .delete(`${apiURL}/${projectId}`)
                .then(() => {
                    navigate("/projects");
                })
                .catch((err) => console.log(err));
        }
    };

    const deleteActividad = (actividadID) => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar la actividad?")

        if (isConfirmed) {
            axios
                .delete(`http://localhost:5005/actividades/${actividadID}`)
                .then(() => {
                    getInitialProject();
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <div >
            {
                project && <>
                    <div className='ContenedorProject'>
                        <div className="DetailsProjectList">
                            <div className="DetailsProject">
                                <h2>{project.titulo}</h2>
                                <p>{project.descripcion}</p>
                                <p>Responsable: {project.responsable}</p>
                                <div className='DetailsProjectFecha'>
                                    <p>Fecha Inicio: {project.fechaInicio}</p>
                                    <p>Fecha Fin: {project.fechaFin}</p>
                                </div>
                                <div className='DetailsProjectPE'>
                                    <p>Prioridad: {project.prioridad}</p>
                                    <p>Estado: {project.estado}</p>
                                </div>
                            </div>
                            <div className='DetailsProjectButton'>
                                <button onClick={deleteProject}>Delete Project</button>
                                <Link to={`/projects/editProject/${projectId}`}>
                                    <button>Edit Project</button>
                                </Link>

                            </div>
                        </div>
                    </div>

                    <div className='EncabezadoActividades'>
                        <h2>Actividades del Proyecto {projectId} </h2>
                        <Link to={`/projects/${projectId}/addActividad`}>
                            <button>Añadir Actividad</button>
                        </Link>
                    </div>

                    <div className='ContenedorActividades'>
                        {
                            project?.actividades?.map(actividad =>
                                <div key={actividad.id} className='DetailsProjectActividades'>
                                    <article className='DetailsProjectActividad'>
                                        <h3>{actividad.titulo}</h3>
                                        <p>{actividad.descripcion}</p>
                                        <p>Fecha Inicio: {actividad.fechaInicio}</p>
                                        <p>Fecha Fin: {actividad.fechaFin}</p>
                                        <p>Estado: {actividad.estado}</p>
                                    </article>
                                    <div className='DetailsActividadButton'>
                                        <button onClick={() => deleteActividad(actividad.id)}>Delete</button>
                                        <Link to={`/projects/${projectId}/editActividad/${actividad.id}`}>
                                            <button>Edit</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </>
            }
        </div>
    )
}