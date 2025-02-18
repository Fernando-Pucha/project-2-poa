import { useState } from 'react'
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

const apiURL = "http://localhost:5005/projects"
const FrontApiURL = "http://localhost:5173/projects"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage apiURL={apiURL} FrontApiURL={FrontApiURL} />} />
        <Route path="/projects/:projectId" element={<DetailsProjectList apiURL={apiURL}/>} />
        <Route path="/projects/addProject" element={<AddProject/>} />
        <Route path="/projects/:projectId/addActividad" element={<AddActividad/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}
export default App
