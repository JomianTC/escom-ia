import { useChangeProcedureState } from '@/api/procedures/use-change-state'
import { useGrantAccess } from '@/api/procedures/use-grant-access'
import { ShareIcon } from '@/components/icons/Icons'
import { ModalLayout } from '@/pages/layouts/ModalLayout'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { closeActivateModal, closeShareModal, openShareModal } from '@/store/slices/uiSlice'
import { Formik } from 'formik'
import { useEffect, useRef } from 'react'

export function ShareModal () {
  const { isShareModalOpen } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()
  const shareModalContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const grantAccess = useGrantAccess()
  useEffect(() => {
    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isShareModalOpen) {
        dispatch(closeShareModal())
      }
    }
    window.addEventListener('keydown', handleCloseModal)
    return () => {
      window.removeEventListener('keydown', handleCloseModal)
    }
  }, [isShareModalOpen])
  useEffect(() => {
    if (isShareModalOpen) {
      const closeModalOnOutsideClick = (e: MouseEvent) => {
        if (e.target === buttonRef.current || (buttonRef.current?.contains(e.target as Node) ?? false)) {
          dispatch(openShareModal())
        } else {
          if ((shareModalContainerRef.current?.contains(e.target as Node)) ?? false) return
          dispatch(closeShareModal())
        }
      }
      window.addEventListener('click', closeModalOnOutsideClick)
      return () => {
        window.removeEventListener('click', closeModalOnOutsideClick)
      }
    }
  }, [isShareModalOpen])
  return (
    <>
      <button ref={buttonRef} className='rounded-lg px-2 py-2 hover:bg-accent_200 group z-10 overflow-hidden transition-colors' onClick={() => dispatch(openShareModal())}> <ShareIcon styles='w-7 h-7 stroke-2 stroke-accent_100 fill-none  select-none group-hover:stroke-primary_300' /> </button>
      {isShareModalOpen && (
        <ModalLayout>
          <div ref={shareModalContainerRef}>
            <h2 className='font-semibold text text-2xl md:text-3xl  '>Compartir</h2>
            <p>Al compartir estre trámite das beneficios de edición</p>
            <div >
              <Formik initialValues={{ email: '' }}
                onSubmit={async (values, actions) => {
                  await grantAccess.mutateAsync(values).then(() => {
                    dispatch(closeShareModal())
                  }).catch((err) => {
                    console.error(err)
                    actions.resetForm()
                  })
                }}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <label htmlFor='email' className='font-semibold'>Compartir con:</label>
                    <input type='email' name='email' value={values.email} onChange={handleChange} className='bg-bg_300 p-2 rounded-lg border-2 border-primary_200' placeholder='' />
                    <button type='submit' className='bg-accent_200 text-bg_300 p-2 rounded-lg'>Enviar</button>
                  </form>
                )}
              </Formik>
              <div className='flex gap-4 justify-end mt-8'>
                <button onClick={async () => { dispatch(closeShareModal()) }} className='bg-accent_100 text-bg_300 p-2 rounded-lg px-3'>Cancelar</button>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </>
  )
}

export function ActivateModal () {
  const { isActivateModalOpen, infoModal } = useAppSelector(state => state.ui)
  const changeProcedureState = useChangeProcedureState()
  const dispatch = useAppDispatch()
  const text = (infoModal.estado === true) ? 'baja' : 'alta'

  const handleConfirm = async () => {
    await changeProcedureState.mutateAsync({ id: infoModal.id, estado: !(infoModal.estado ?? false) }).then((_res) => {
      dispatch(closeActivateModal())
    })
  }
  return (
    <>
      {isActivateModalOpen && (
        <ModalLayout>
          <>
            <h2 className='font-semibold text text-2xl md:text-2xl  '>¿Dar de {text } el trámite:
              <span className='text-xl font-normal italic '> { infoModal.nombre }</span>
               ?</h2>
            <p>Al confirmar se les mandará una notificación a los estudiantes del cambio de estado de este trámite</p>
            <div >
              <div className='flex gap-4 justify-end mt-8'>
                <button onClick={async () => { dispatch(closeActivateModal()) }} className='bg-accent_100 text-bg_100 font-semibold p-2 rounded-lg px-3'>Cancelar</button>
                <button onClick={async () => { await handleConfirm() }} className='bg-accent_200 text-text_100 p-2 rounded-lg px-3 hover:bg-bg_200 font-semibold hover:font-bold transition-colors disabled:bg-slate-500 disabled:text-bg_100' disabled={changeProcedureState.isPending}>
                  {changeProcedureState.isPending ? 'Cargando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </>
        </ModalLayout>
      )}
    </>
  )
}
