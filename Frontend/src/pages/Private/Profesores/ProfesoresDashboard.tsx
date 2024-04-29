import { useDeleteTeacher } from '@/api/teachers/use-delete-teacher'
import { useTeachers } from '@/api/teachers/use-get-teachers'
import Loader from '@/components/Loader'
import Modal, { ModalTrigger } from '@/components/Modal'
import { useSearch } from '@/pages/hooks/useSearch'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { closeDeleteModal, setEditMode } from '@/store/slices/uiSlice'
import { LEVEL_ACCESS } from '@/types/index'
import { useEffect } from 'react'
import uuid from 'react-uuid'
import { ProfesorCard } from './components/ProfesorCard'

export function Profesores () {
  const { rol } = useAppSelector((state) => state.auth)
  const { isDeleteModalOpen, infoModal } = useAppSelector((state) => state.ui)
  const { isEditMode } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()

  const { data, isLoading } = useTeachers()

  const { search, setSearch, filteredData } = useSearch({
    type: 'profesor',
    data: data?.profesores ?? []
  })
  const handleEditMode = () => {
    dispatch(setEditMode(!isEditMode))
  }

  const deleteTeacher = useDeleteTeacher()

  const handleRemoveTeacher = async (id: string) => {
    await deleteTeacher.mutateAsync({ id })
    dispatch(closeDeleteModal())
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
      <section className='profesores__grid container p-8 w-full h-full my-0 mx-auto grid gap-2 sm:gap-6 relative z-40 overflow-y-scroll custom-scrollbar auto-rows-min'>
        <div className="controls col-span-full">
          <h1 className='grid__title'>Profesores</h1>
          <div className='flex items-center gap-6 flex-wrap'>
            <input type="text" placeholder='Profesor' value={search} onChange={(e) => { setSearch(e.target.value) }} className='text-text_accent my-6 py-1 px-4 w-full max-w-lg ' />
            <div className='grow flex justify-end  '>
            {rol === LEVEL_ACCESS.ADMIN && (<button className={`w-max px-4 py-1 bg-bg_200 rounded-full font-bold cursor-pointer border-accent_200 border-2 outline-none active:border-0  focus:border-0 border-none focus:outline-accent_200 focus-visible:outline-accent_200 ring-accent_100  ${isEditMode ? 'bg-primary_200 text-black hover:bg-primary_op_100/80' : 'hover:bg-primary_op_100/40'}` } onClick={handleEditMode}>Editar profesores</button>)}
            </div>
          </div>
          {/* <div className='flex flex-col items-end gap-2'>
            <span>Mostrando página: {page} de { totalPages }</span>
            <div className="flex">
              <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700  disabled:opacity-40' onClick={() => { handlePageChange(page - 1) }} disabled={page === 1}>Anterior</button>
              <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 ' onClick={() => { handlePageChange(page + 1) }} disabled={page === totalPages }>Siguiente</button>
            </div>
          </div> */}
        </div>
        {filteredData?.map((profesor) => (
          <ProfesorCard key={uuid()} {...profesor} detail={false}/>
        ))}
      {isDeleteModalOpen && (
        <div className='fixed w-full h-screen top-0 left-0 flex justify-center items-center bg-zinc-400/80  z-[9000] p-8'>
          <div className='bg-bg_300 p-4 rounded-lg text-text_100 flex flex-col gap-8'>
            <h2 className='font-semibold text text-2xl md:text-3xl  '>¿Seguro que quieres eliminar al profesor?</h2>
            <div >
              <p className='text-base md:text-lg '>¿Estas seguro de eliminar a {infoModal?.nombre }?</p>
              <div className='flex gap-4 justify-end mt-8'>
                <button onClick={async () => { await handleRemoveTeacher(infoModal.id) }} className='bg-accent_200 text-bg_300 p-2 rounded-lg'>Eliminar</button>
                <button onClick={async () => { dispatch(closeDeleteModal()) }} className='bg-accent_100 text-bg_300 p-2 rounded-lg'>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      ) }
        {rol === 'student' && (
            <Modal trigger={
                  <ModalTrigger
                    className='w-20 h-20 bg-primary_200 rounded-full fixed bottom-8 right-10 opacity-80  flex items-center justify-center text-white font-bold text-2xl hover:opacity-100 hover:bg-primary_300 hover:text-black cursor-pointer'
                  >
                    +
                  </ModalTrigger>
                }>
            <Modal.Body>
                  <Modal.Title title={'Agrega Profesor'} />
                  <Modal.Profesor/>
            </Modal.Body>
                  <Modal.Controls />
          </Modal>
        )}

      </section>
  )
}
