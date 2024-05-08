import { ModalLayout } from '@/pages/layouts/ModalLayout'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { closeCreateTeacherModal, openCreateTeacherModal } from '@/store/slices/uiSlice'
import { ProfesorForm } from './Form'
import { useEffect } from 'react'

export function AddProfesorModal () {
  const { isCreateTeacherModalOpen } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeCreateTeacherModal())
      }
    }
    window.addEventListener('keydown', handleCloseModal)
    return () => {
    //   dispatch(closeCreateTeacherModal())
      window.removeEventListener('keydown', handleCloseModal)
    }
  }, [])
  return (
    <>
      <button className='w-20 h-20 bg-primary_200 rounded-full fixed bottom-8 right-10 opacity-80  flex items-center justify-center text-white font-bold text-2xl hover:opacity-100 hover:bg-primary_300 hover:text-black cursor-pointer' onClick={() => dispatch(openCreateTeacherModal())}>+</button>
          {isCreateTeacherModalOpen && (
              <ModalLayout>
                    <ProfesorForm />
                    <button onClick={async () => { dispatch(closeCreateTeacherModal()) }} className='bg-accent_100 text-bg_300 p-2 rounded-lg px-3'>Cancelar</button>
              </ModalLayout>
          )
}
      </>
  )
}
