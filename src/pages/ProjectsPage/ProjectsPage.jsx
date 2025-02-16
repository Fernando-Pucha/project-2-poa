/* import { useEffect, useState } from "react";
import axios from "axios";


const apiURL = "http://localhost:5005/objetivos"; */

export default function ProjectsPage() {
   /*  const [projects, setProjects] = useState([]);
    useEffect(() => {
        axios
            .get(apiURL)
            .then(res => setProjects(res.data))
            .catch(err => console.log(err))
    }, [])
 */
    return (
        <div>
            <h2> Proyectos POA </h2>
{/*             {projects.length > 0 ?
                projects.map(project =>
                    <article key={project.id}>
                        <p>{project.titulo}</p>
                    </article>
                ) : <p>No projects to show</p>
            } */}
        </div>
    )
}