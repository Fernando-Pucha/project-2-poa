import { useNavigate } from "react-router";
import './AddProject.css'
import { useState } from "react";
import axios from 'axios';

const apiURL = "http://localhost:5005/projects/";

export default function AddProject() {

    let navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            titulo, descripcion, fechaInicio, fechaFin, responsable, estado, prioridad
        };

        axios
            .post(apiURL, newProject)
            .then(res => navigate("/projects"))
            .catch(err => console.log(err))
    }

    return (
        <form className="formAddProduct" onSubmit={handleSubmit}>
            <span>Add a Project</span>
            <div className="form-grid">
                <input name="name" type="text" placeholder="Project Name" value={titulo} onChange={handleTituloInput} required />
                <input name="StarDate" type="date" placeholder="Start Date" value={fechaInicio} onChange={handleFechaInicioInput} required />
                <input name="EndDate" type="date" placeholder="End Date" value={fechaFin} onChange={handleFechaFinInput} required />
                <input name="Responsible" type="text" placeholder="Responsible" value={responsable} onChange={handleResponsableInput} required />
                <select name="Estatus" value={estado} onChange={handleEstadoInput} required>
                    <option value="" disabled>Estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En-Proceso">En Proceso</option>
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
