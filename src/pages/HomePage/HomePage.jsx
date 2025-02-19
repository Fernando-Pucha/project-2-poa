import { useEffect, useState } from 'react';
import './HomePage.css'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from 'axios';

const Card = ({ children }) => (
    <div className="card">{children}</div>
);
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;

const apiURL = "http://localhost:5005/projects"

export default function HomePage() {

    const [projects, setProjects] = useState([]);
    const [projectAlta, setProjectAlta] = useState(0);
    const [projectsMedia, setProjectsMedia] = useState(0);
    const [projectsBaja, setProjectsBaja] = useState(0);
    const [projectPendiente, setProjectPendiente] = useState(0);
    const [projectsEnProceso, setProjectsEnProceso] = useState(0);
    const [projectsTerminado, setProjectsTerminado] = useState(0);

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
                setProjectPendiente(preprojectPendiente => preprojectPendiente + 1)
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
            { estado: "Pendiente", cantidad: 6 },
            { estado: "En Proceso", cantidad: 4 },
            { estado: "Terminado", cantidad: 5 },
        ],
    };

    const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

    return (
        <div className="container">
            <Card>
                <div className="flex-container">
                    <CardContent className="column">
                        <h2 className="title">Resumen de Proyectos</h2>
                        <p>Proyectos: {projects.length}</p>
                        <p>Pendientes: {projectPendiente}</p>
                        <p>En proceso: {projectsEnProceso}</p>
                        <p>Terminado: {projectsTerminado}</p>

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
                        <p>Actividades: {data.actividades.reduce((acc, a) => acc + a.cantidad, 0)}</p>
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
