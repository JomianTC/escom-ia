import { useTeachers } from '@/api/teachers/use-get-teachers'
import { Route, Routes } from 'react-router-dom'
import { Profesor } from './Profesor'
import { ProfesorCard } from './components/ProfesorCard'

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
    <section className='profesores__grid container'>
      <h1 className='grid__title'>Profesores</h1>
      {data?.teachers?.map((profesor) => (
        <ProfesorCard key={profesor.email} {...profesor} />
      ))}
    </section>
  )
}
