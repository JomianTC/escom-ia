import Loader from '@/components/Loader'
import Modal, { ModalTrigger } from '@/components/Modal'
import { useSearch } from '@/pages/hooks/useSearch'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { setEditMode } from '@/store/slices/procedureModalSlice'
import { LEVEL_ACCESS } from '@/types/index'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import uuid from 'react-uuid'
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
  const { rol } = useAppSelector((state) => state.auth)
  const { isEditMode } = useAppSelector((state) => state.procedure)
  const dispatch = useAppDispatch()

  const { search, setSearch, filteredData, isLoading, page, handlePageChange, totalPages } = useSearch('posts')

  const handleEditMode = () => {
    dispatch(setEditMode(!isEditMode))
  }

  useEffect(() => {
    return () => {
      dispatch(setEditMode(false))
    }
  }, [])

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <section className='profesores__grid container gap-8 sm:gap-8 relative'>
      <div className="controls col-span-full">
        <h1 className='grid__title'>Profesores</h1>
        <div className='flex items-center gap-6 flex-wrap'>
          <input type="text" placeholder='Profesor' value={search} onChange={(e) => { setSearch(e.target.value) }} className='text-zinc-800 my-6 py-1 px-4 w-full max-w-lg ' />
          <div className='grow flex justify-end  '>
            {rol === LEVEL_ACCESS.ADMIN && (<button className='w-max px-2 py-1 bg-bg_200 rounded-full font-bold cursor-pointer hover:bg-bg_100' onClick={handleEditMode}>Editar profesores</button>)}
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <span>Mostrando página: {page} de { totalPages }</span>
          <div className="flex">
            <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700  disabled:opacity-40' onClick={() => { handlePageChange(page - 1) }} disabled={page === 1}>Anterior</button>
            <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 ' onClick={() => { handlePageChange(page + 1) }} disabled={page === totalPages }>Siguiente</button>
          </div>
        </div>
      </div>
      {filteredData?.map((profesor) => (
        <ProfesorCard key={uuid()} {...profesor} detail={false} edit={ isEditMode} />
      ))}
      {rol === 'student' && (
              <Modal trigger={
                <ModalTrigger
                  className='w-20 h-20 bg-primary_200 rounded-full fixed bottom-16 opacity-80  flex items-center justify-center text-white font-bold text-2xl hover:opacity-100 hover:bg-primary_300 hover:text-black cursor-pointer'
                >
                  +
                </ModalTrigger>
              }>
                <Modal.Title title={'Agrega Profesor'} />
              <Modal.Profesor/>
                <Modal.Controls />
              </Modal>
      )}

    </section>
  )
}
