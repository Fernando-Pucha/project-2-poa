import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_BACK_URL}/projects`;

export default function EditProject() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [responsable, setResponsable] = useState('');
    const [estado, setEstado] = useState('');
    const [prioridad, setPrioridad] = useState('');

    const handleTituloInput = e => setTitulo(e.target.value);
    const handleDescripcionInput = e => setDescripcion(e.target.value);
    const handleFechaInicioInput = e => setFechaInicio(e.target.value);
    const handleFechaFinInput = e => setFechaFin(e.target.value);
    const handleResponsableInput = e => setResponsable(e.target.value);
    const handleEstadoInput = e => setEstado(e.target.value);
    const handlePrioridadInput = e => setPrioridad(e.target.value);

    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API_URL}/${projectId}`)
            .then((response) => {
                const oneProject = response.data;
                setTitulo(oneProject.titulo);
                setDescripcion(oneProject.descripcion);
                setFechaInicio(oneProject.fechaInicio);
                setFechaFin(oneProject.fechaFin);
                setResponsable(oneProject.responsable);
                setEstado(oneProject.estado);
                setPrioridad(oneProject.prioridad);
            })
            .catch((error) => console.log(error));
    }, [projectId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = { titulo, descripcion, fechaInicio, fechaFin, responsable, estado, prioridad };

        axios
            .put(`${API_URL}/${projectId}`, requestBody)
            .then(() => {navigate(`/projects/${projectId}`)})
            .catch((error) => console.log(error));
    };

    return (
        <form className="formAddProduct" onSubmit={handleFormSubmit}>
            <span>Add a Project</span>
            <div className="form-grid">
                <input name="name" type="text" placeholder="Project Name" value={titulo} onChange={handleTituloInput} required />
                <input name="StarDate" type="date" placeholder="Start Date" value={fechaInicio} onChange={handleFechaInicioInput} required />
                <input name="EndDate" type="date" placeholder="End Date" value={fechaFin} onChange={handleFechaFinInput} required />
                <input name="Responsible" type="text" placeholder="Responsible" value={responsable} onChange={handleResponsableInput} required />
                <select name="Estatus" value={estado} onChange={handleEstadoInput} required>
                    <option value="" disabled>Estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Terminado">Terminado</option>
                </select>
                <select name="Priority" value={prioridad} onChange={handlePrioridadInput} required>
                    <option value="" disabled>Prioridad</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
                <textarea name="description" placeholder="Project Description" value={descripcion} onChange={handleDescripcionInput} required />
            </div>

            <button type="submit">Submit</button>

        </form>
    );
}
