import { ModalLayout } from '@/pages/layouts/ModalLayout'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { closeCreateTeacherModal, openCreateTeacherModal } from '@/store/slices/uiSlice'
import { useEffect, useRef } from 'react'
import { ProfesorForm } from './Form'

export function AddProfesorModal () {
  const { isCreateTeacherModalOpen } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()
  const modalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (isCreateTeacherModalOpen) {
      const closeModalOnOutsideClick = (e: MouseEvent) => {
        if (e.target === buttonRef.current) {
          dispatch(openCreateTeacherModal())
        } else {
          if ((modalRef.current?.contains(e.target as Node)) ?? false) return
          dispatch(closeCreateTeacherModal())
        }
      }
      window.addEventListener('click', closeModalOnOutsideClick)
      return () => {
        window.removeEventListener('click', closeModalOnOutsideClick)
      }
    }
  }, [isCreateTeacherModalOpen])
  useEffect(() => {
    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCreateTeacherModalOpen) {
        dispatch(closeCreateTeacherModal())
      }
    }
    window.addEventListener('keydown', handleCloseModal)
    return () => {
      window.removeEventListener('keydown', handleCloseModal)
    }
  }, [isCreateTeacherModalOpen])
  return (
    <>
      <button className='w-20 h-20 bg-primary_200 border-4 rounded-full fixed bottom-8 right-10 opacity-80  flex items-center justify-center text-white font-bold text-2xl hover:opacity-100 hover:bg-primary_300 hover:text-black cursor-pointer hover:text-6xl transition-all hover:scale-90' onClick={() => dispatch(openCreateTeacherModal())} ref={buttonRef}>
        +
      </button>
      {isCreateTeacherModalOpen && (
        <ModalLayout>
                <div ref={modalRef}>
                    <ProfesorForm />
                    <button onClick={async () => { dispatch(closeCreateTeacherModal()) }} className='bg-accent_100 text-bg_300 p-2 rounded-lg px-3 mt-4'>Cancelar</button>
              </div>
              </ModalLayout>
      )
}
      </>
  )
}
