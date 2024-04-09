import { useTeachers } from '@/api/teachers/use-get-teachers'
import Loader from '@/components/Loader'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
  console.log('Profesores')

  const { data, isLoading, isError, page, handlePageChange, totalPages } = useTeachers()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <Loader />
    )
  }
  if (isError) { navigate('/404') }

  return (
    <section className='profesores__grid container gap-8 sm:gap-8'>
      <div className="controls col-span-full">
        <h1 className='grid__title'>Profesores</h1>
        <div className='flex flex-col items-end gap-2'>
          <span>Mostrando página: {page} de { totalPages }</span>
          <div className="flex">
            <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700  disabled:opacity-40' onClick={() => { handlePageChange(page - 1) }} disabled={page === 1}>Anterior</button>
            <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 ' onClick={() => { handlePageChange(page + 1) }} disabled={page === totalPages }>Siguiente</button>
          </div>
        </div>
      </div>
      {data?.teachers?.map((profesor) => (
        <ProfesorCard key={profesor.email} {...profesor} detail={ false} />
      ))}
    </section>
  )
}
