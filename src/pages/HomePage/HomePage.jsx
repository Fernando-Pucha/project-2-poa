import { useEffect, useState } from 'react';
import './HomePage.css'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from 'axios';

const Card = ({ children }) => (
    <div className="card">{children}</div>
);
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;

const apiURL = `${import.meta.env.VITE_BACK_URL}/projects`
const apiActividadesURL = `${import.meta.env.VITE_BACK_URL}/actividades`

export default function HomePage() {

    const [projects, setProjects] = useState([]);
    const [projectAlta, setProjectAlta] = useState(0);
    const [projectsMedia, setProjectsMedia] = useState(0);
    const [projectsBaja, setProjectsBaja] = useState(0);
    const [projectPendiente, setProjectsPendiente] = useState(0);
    const [projectsEnProceso, setProjectsEnProceso] = useState(0);
    const [projectsTerminado, setProjectsTerminado] = useState(0);

    const [actividades, setActividades] = useState([]);
    const [actividadesPendiente, setActividadesPendiente] = useState(0);
    const [actividadesEnProceso, setActividadesEnProceso] = useState(0);
    const [actividadesTerminado, setActividadesTerminado] = useState(0);

    const countProject = (projectCount) => {
        projectCount.forEach(project => {
            if (project.prioridad === "Alta") {
                setProjectAlta(preprojectAlta => preprojectAlta + 1)
            } else if (project.prioridad === "Media") {
                setProjectsMedia(preprojectMedia => preprojectMedia + 1)
            } else if (project.prioridad === "Baja") {
                setProjectsBaja(preprojectBaja => preprojectBaja + 1)
            }

            if (project.estado === "Pendiente") {
                setProjectsPendiente(preprojectPendiente => preprojectPendiente + 1)
            } else if (project.estado === "En Proceso") {
                setProjectsEnProceso(preprojectEnProceso => preprojectEnProceso + 1)
            } else if (project.estado === "Terminado") {
                setProjectsTerminado(preprojectTerminado => preprojectTerminado + 1)
            }
        })
    }

    useEffect(() => {
        axios
            .get(apiURL)
            .then(res => {
                setProjects(res.data)
                countProject(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const countActividades = (actividadesCount) => {
        actividadesCount.forEach(actividad => {
            if (actividad.estado === "Pendiente") {
                setActividadesPendiente(preprojectAlta => preprojectAlta + 1)
            } else if (actividad.estado === "En Proceso") {
                setActividadesEnProceso(preprojectMedia => preprojectMedia + 1)
            } else if (actividad.estado === "Terminado") {
                setActividadesTerminado(preprojectBaja => preprojectBaja + 1)
            }
        })
    }

    useEffect(() => {
        axios
            .get(apiActividadesURL)
            .then(res => {
                setActividades(res.data)
                countActividades(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    const data = {
        proyectos: [
            { prioridad: "Alta", cantidad: projectAlta },
            { prioridad: "Media", cantidad: projectsMedia },
            { prioridad: "Baja", cantidad: projectsBaja },
        ],
        estadosProyectos: [
            { estado: "Pendiente", cantidad: projectPendiente },
            { estado: "En Proceso", cantidad: projectsEnProceso },
            { estado: "Terminado", cantidad: projectsTerminado },
        ],
        actividades: [
            { estado: "Pendiente", cantidad: actividadesPendiente },
            { estado: "En Proceso", cantidad: actividadesEnProceso },
            { estado: "Terminado", cantidad: actividadesTerminado },
        ],
    };

    const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

    return (
        <div className="container">
            <Card>
                <div className="flex-container">
                    <CardContent className="column">
                        <h2 className="title">Resumen de Proyectos</h2>
                        <p>Total Proyectos: {projects.length}</p>
                        <p>Proyectos Pendientes: {projectPendiente}</p>
                        <p>Proyectos en Proceso: {projectsEnProceso}</p>
                        <p>Proyectos Terminados: {projectsTerminado}</p>

                        <h2 className="subtitle">Proyectos por Prioridad</h2>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={data.proyectos}
                                dataKey="cantidad"
                                nameKey="prioridad"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {data.proyectos.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </CardContent>

                    <CardContent className="column">
                        <h2 className="title">Resumen de Actividades</h2>
                        <p>Actividades: {actividades.length}</p>
                        <h2 className="subtitle">Actividades por estado</h2>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={data.actividades}
                                dataKey="cantidad"
                                nameKey="estado"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {data.actividades.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
