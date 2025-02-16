import './Navbar.css'
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="Navbar">
            <img src="https://uei.edu.ec/wp-content/smush-webp/2024/08/LogoUebi.png.webp" alt="" />
            <ul>
                <NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}>
                    Home
                </NavLink>
                <NavLink to="/projects" className={({ isActive }) => isActive ? "selected" : ""}>
                    Projects
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "selected" : ""}>
                    About
                </NavLink>                
            </ul>
        </nav>
    );
}

export default Navbar;
