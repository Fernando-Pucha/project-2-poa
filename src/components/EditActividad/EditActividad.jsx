
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005/actividades";

export default function EditActividad() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estado, setEstado] = useState('');
    const handleTituloInput = e => setTitulo(e.target.value);
    const handleDescripcionInput = e => setDescripcion(e.target.value);
    const handleFechaInicioInput = e => setFechaInicio(e.target.value);
    const handleFechaFinInput = e => setFechaFin(e.target.value);
    const handleEstadoInput = e => setEstado(e.target.value);

    const { projectId, actividadId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API_URL}/${actividadId}`)
            .then((response) => {
                const oneActividad = response.data;
                setTitulo(oneActividad.titulo);
                setDescripcion(oneActividad.descripcion);
                setFechaInicio(oneActividad.fechaInicio);
                setFechaFin(oneActividad.fechaFin);
                setEstado(oneActividad.estado);
            })
            .catch((error) => console.log(error));
    }, [actividadId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { projectId: Number(projectId), titulo, descripcion, fechaInicio, fechaFin, estado };

        axios
            .put(`${API_URL}/${actividadId}`, requestBody)
            .then(() => {navigate(`/projects/${projectId}`)})
            .catch((error) => console.log(error));
    };

    return (
        <form className="formAddProduct" onSubmit={handleFormSubmit}>
            <span>Edit Activity</span>
            <div className="form-grid">
                <input name="name" type="text" placeholder="Activity Name" value={titulo} onChange={handleTituloInput} required />
                <input name="StarDate" type="date" placeholder="Start Date" value={fechaInicio} onChange={handleFechaInicioInput} required />
                <input name="EndDate" type="date" placeholder="End Date" value={fechaFin} onChange={handleFechaFinInput} required />
                <select name="Estatus" value={estado} onChange={handleEstadoInput} required>
                    <option value="" disabled>Estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Terminado">Terminado</option>
                </select>
                <textarea name="description" placeholder="Project Description" value={descripcion} onChange={handleDescripcionInput} required />
            </div>

            <button type="submit">Submit</button>

        </form>
    );
}
