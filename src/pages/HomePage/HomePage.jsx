import './HomePage.css'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Card = ({ children }) => (
    <div className="card">{children}</div>
);
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;

const data = {
    proyectos: [
        { prioridad: "Alta", cantidad: 3 },
        { prioridad: "Media", cantidad: 5 },
        { prioridad: "Baja", cantidad: 2 },
    ],
    estadosProyectos: [
        { estado: "Pendiente", cantidad: 4 },
        { estado: "En Proceso", cantidad: 3 },
        { estado: "Terminado", cantidad: 3 },
    ],
    actividades: [
        { estado: "Pendiente", cantidad: 6 },
        { estado: "En Proceso", cantidad: 4 },
        { estado: "Terminado", cantidad: 5 },
    ],
};

const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

export default function HomePage() {
    return (
        <div className="container">
            <Card>
                <div className="flex-container">
                    <CardContent className="column">
                        <h2 className="title">Resumen de Proyectos</h2>
                        <p>Proyectos: {data.proyectos.reduce((acc, p) => acc + p.cantidad, 0)}</p>
                        <p>Pendientes: {data.estadosProyectos[0].cantidad}</p>
                        <p>En proceso: {data.estadosProyectos[1].cantidad}</p>
                        <p>Terminado: {data.estadosProyectos[2].cantidad}</p>

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
