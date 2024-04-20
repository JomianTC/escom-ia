import { Route, Routes } from 'react-router-dom'
import { Profesor } from './Profesor'
import { Profesores } from './ProfesoresDashboard'

export default function ProfesoresPage () {
  return (
    <Routes>
      <Route path="/" element={<Profesores/>} />
      <Route path="/:id" element={<Profesor/>} />
    </Routes>
  )
}
