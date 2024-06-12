import { useTeachers } from '@/api/teachers/use-get-teachers'
import Loader from '@/components/Loader'
import { useSearch } from '@/pages/hooks/useSearch'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { setEditMode } from '@/store/slices/uiSlice'
import { LEVEL_ACCESS } from '@/types/index'
import { useEffect } from 'react'
import uuid from 'react-uuid'
import { DeleteProfesorModal } from '../Dashboard/Modal'
import { AddProfesorModal } from './components/Modal'
import { ProfesorCard } from './components/ProfesorCard'

export function Profesores () {
  const { rol } = useAppSelector((state) => state.auth)
  const { isDeleteModalOpen } = useAppSelector((state) => state.ui)
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
    <section className='profesores__grid container p-8 w-full h-full my-0 mx-auto grid gap-2 sm:gap-6 relative z-40 overflow-y-scroll custom-scrollbar auto-rows-min '>
      <div className="controls col-span-full">
        <h1 className='grid__title'>Profesores</h1>
        <div className='flex items-center gap-2 flex-wrap'>
          <div className='w-full max-w-lg flex flex-col gap-0'>
            <label className='text-base font-semibold' htmlFor="profesor-search">Profesor:</label>
            <input type="text" id='profesor-search' placeholder='Cortez Duarte ...' value={search} onChange={(e) => { setSearch(e.target.value) }} name='profesor-search' className='text-text_accent my-2 py-1 px-4 w-full ' />
          </div>
          <div className='grow flex justify-end  '>
            {(rol === LEVEL_ACCESS.ADMIN && data?.total !== 0) && (<button className={`w-max px-4 py-1 bg-bg_200 rounded-full font-bold cursor-pointer border-accent_200 border-2 outline-none active:border-0  focus:border-0 border-none focus:outline-accent_200 focus-visible:outline-accent_200 ring-accent_100  ${isEditMode ? 'bg-primary_200 text-black hover:bg-primary_op_100/80' : 'hover:bg-primary_op_100/40'}`} onClick={handleEditMode}>Eliminar profesores</button>)}
          </div>
        </div>
      </div>
      {filteredData?.map((profesor) => (
        <ProfesorCard key={uuid()} {...profesor} detail={false} />
      ))}
      {isDeleteModalOpen && <DeleteProfesorModal />}
      {rol === 'student' && (
        <AddProfesorModal />
      )}

    </section>
  )
}
