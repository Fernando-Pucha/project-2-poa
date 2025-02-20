import './App.css'
import AboutPage from './pages/AboutPage/AboutPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import DetailsProjectList from './components/DetailsProjectList/DetailsProjectList'
import AddProject from './components/AddProject/AddProject'
import AddActividad from './components/AddActividad/AddActividad'
import EditProject from './components/EditProject/EditProject'
import EditActividad from './components/EditActividad/EditActividad'
import Footer from './components/Footer/Footer'
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/activities" element={<ActivitiesPage/>} />
        <Route path="/projects/:projectId" element={<DetailsProjectList />} />
        <Route path="/projects/addProject" element={<AddProject/>} />
        <Route path="/projects/:projectId/addActividad" element={<AddActividad/>} />
        <Route path="/projects/editProject/:projectId" element={<EditProject/>} />
        <Route path="/projects/:projectId/editActividad/:actividadId" element={<EditActividad/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </div>
  )
}
export default App
