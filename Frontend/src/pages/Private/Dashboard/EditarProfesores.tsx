import { useTeacher } from '@/api/teachers/get-teacher'
import { useTeachers } from '@/api/teachers/use-get-teachers'
import ImageLoader from '@/components/ImageLoader'
import Loader from '@/components/Loader'
import { ReturnButton } from '@/components/ReturnButton'
import { useSearch } from '@/pages/hooks/useSearch'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { openDeleteModal, setInfoModal } from '@/store/slices/uiSlice'
import { NavLink } from 'react-router-dom'
import { ProfesorForm } from '../Profesores/components/Form'

export const EditarProfesores = () => {
  const { data, isLoading } = useTeachers()
  const { search, setSearch, filteredData } = useSearch({
    type: 'profesor',
    data: data?.profesores ?? []
  })

  const dispatch = useAppDispatch()

  if (isLoading) {
    return (
          <Loader />
    )
  }

  return (
      <div className='grow flex flex-col  mt-0 overflow-hidden'>
        <div className='grow flex gap-2 flex-wrap justify-start items-start content-start h-full overflow-y-scroll custom-scrollbar'>
          <header className='w-full flex'>
            <h3 className='text-lg grow font-semibold  text-primary_200 bg-primary_op_100/20 px-4 py-1 '>Selecciona un Profesor para actualizar</h3>
            <ReturnButton styles='w-8 h-8 sm:w-8 sm:h-8 ' />
          </header>
          <input type="text" placeholder='Profesor' value={search} onChange={(e) => { setSearch(e.target.value) }} className='text-text_accent mb-4 w-full max-w-lg ' />
          <div className='w-full flex gap-2 flex-wrap h-full  content-start '>
            {filteredData?.map((profesor) => (
              <div key={profesor.id} className='tag h-fit sm:px-3 flex gap-2 py-1 rounded-lg text-sm sm:text-lg ' >
              <NavLink to={`${profesor.id}`} className='px-3 py-1 rounded-lg hover:font-bold'>{profesor.nombre}</NavLink>
                <button className='hover:text-red-400 hover:scale-125 font-bold px-4 text-lg overflow-hidden' onClick={() => {
                  dispatch(setInfoModal({ id: profesor.id, nombre: profesor.nombre, type: 'profesor' }))
                  dispatch(openDeleteModal())
                }}>x</button>
            </div>
            ))}

          </div>
        </div>
      </div>
  )
}

export const EditProfesor = () => {
  const { data } = useTeacher()
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2  w-full h-full grid-rows-[min-content_1fr] overflow-y-scroll custom-scrollbar max-h-[700px] '>
      <div className='sm:col-span-2 flex items-center'>
      <h1 className='grow items-center justify-center h-min font-semibold text-primary_300 bg-primary_op_100/90 px-2 sm:text-center text-white shadow-lg drop-shadow-2xl border-4 text-2xl sm:text-4xl '>{data?.nombre }</h1>
    <ReturnButton styles='w-8 h-8 sm:w-12 sm:h-12' />
      </div>
      {/* Columna profesor */}
      <div className='w-full h-full bg-primary_300 flex flex-col  justify-center content-center items-center text-white py-4'>
        <ImageLoader externalUrl={data?.foto_perfil ?? ''} />
        <p className='text-xl px-2 sm:text-3xl font-semibold mt-8 text-center'>{data?.area}</p>
        <p className='text-base sm:text-xl italic'>{data?.grado_academico}</p>
        <p className='text-base sm:text-xl mt-8'>{data?.email}</p>
        <p className='text-base sm:text-xl mt-4'>{data?.contacto}</p>
      </div>
      {/* Columna Formulario */}
      <div className='w-full h-full bg-transparent'>
        {(data != null) && <ProfesorForm action='update' styles='max-h-full h-full custom-scrollbar justify-center' data={data}/>}

      </div>
      </div>

  )
}
