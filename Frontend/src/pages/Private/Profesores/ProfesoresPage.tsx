import { Link, Route, Routes } from 'react-router-dom'
import { Profesor } from './Profesor'
import { useTeachers } from '@/api/teachers/use-get-teachers'

export function ProfesoresPage () {
  return (
    <Routes>
      <Route path="/" element={<Profesores/>} />
      <Route path="/:id" element={<Profesor/>} />
    </Routes>
  )
}

function Profesores () {
  const { data, isLoading, isError } = useTeachers()

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Something happenend</h1>

  return (
    <div className='h-screen bg-pink-400'>
      <Link to="1">Profesor 1</Link>
      <Link to="Various">Profesor 2</Link>
    </div>
  )
}
