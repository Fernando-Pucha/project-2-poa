import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'

export default function ErrorPage() {
  const navigate = useNavigate();
    return (
      <div className="error-container">
           <img src="https://www.qualentum.com/wp-content/uploads/2024/03/Imagen-de-storyset-en-Freepik-3-1024x1024.jpg" alt="eror-404" />
           <h1>¡Ups!</h1>
           <p>La página no se a encontrado</p>
           <button onClick={() => navigate("/")}>Back to Dashboard</button>
      </div>
    );
  }