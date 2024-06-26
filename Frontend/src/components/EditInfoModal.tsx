import { AdminForm } from '@/pages/Register/AdminForm/AdminForm'
import { StudentForm } from '@/pages/Register/StudentForm/StudentForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { changeState } from '@/store/slices/uiSlice'
import { LEVEL_ACCESS } from '@/types/index'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal, { AdminInfo, ModalTrigger, StudentInfo } from './Modal'
import { ActionButton } from './ActionButton'

export default function EditInfoModal () {
  const { rol } = useAppSelector((state) => state.auth)
  const { nombres, foto_perfil: fotoPerfil } = useAppSelector((state) => state.user)
  const { changeState: changeModalState } = useAppSelector((state) => state.ui)
  const [modify, setModify] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handlePageChange = () => {
    dispatch(changeState())
    setModify(false)
    navigate('/private/comments')
  }
  useEffect(() => {
    setModify(false)
  }, [changeModalState])
  const isStudent = rol === LEVEL_ACCESS.STUDENT
  return (
    <>
      <Modal trigger={<ModalTrigger className={'profile-icon w-9 h-9 absolute bottom-0 sm:relative opacity-100 overflow-hidden rounded-full hover:scale-110 transition-transform'} ref={buttonRef}>
      {rol === LEVEL_ACCESS.STUDENT && (<img src={fotoPerfil} alt={nombres} />)}
    </ModalTrigger>
      }>
        <Modal.Title title='Perfil' />
        <Modal.Body>
          <div className='flex gap-4'>
            <ActionButton extraStyles='mt-4 mb-4' callback={() => { setModify(!modify) }} text={modify ? 'Cancelar' : 'Modificar'} />
            <ActionButton extraStyles='mt-4 mb-4' callback={handlePageChange} text='Mis comentarios' />
          </div>
            {modify
              ? (
                  isStudent ? <StudentForm isUpdate /> : <AdminForm isUpdate/>
                )
              : isStudent ? <StudentInfo /> : <AdminInfo />
              }
          </Modal.Body>
        <Modal.Controls />
    </Modal>
    </>
  )
}
