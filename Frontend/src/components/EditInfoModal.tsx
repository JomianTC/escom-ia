import { AdminForm } from '@/pages/Register/AdminForm/AdminForm'
import { StudentForm } from '@/pages/Register/StudentForm/StudentForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { changeState } from '@/store/slices/uiSlice'
import { LEVEL_ACCESS } from '@/types/index'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal, { AdminInfo, ModalTrigger, StudentInfo } from './Modal'

export default function EditInfoModal () {
  const { rol } = useAppSelector((state) => state.auth)
  const { nombres, foto_perfil: fotoPerfil } = useAppSelector((state) => state.user)
  const [modify, setModify] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handlePageChange = () => {
    dispatch(changeState())
    navigate('/private/comments')
  }
  const isStudent = rol === LEVEL_ACCESS.STUDENT
  return (
    <>
      <Modal trigger={<ModalTrigger className={'profile-icon w-12 h-12 absolute bottom-0 sm:relative opacity-100'}>
      {rol === LEVEL_ACCESS.STUDENT && (<img src={fotoPerfil} alt={nombres} />)}
    </ModalTrigger>
      }>
        <Modal.Title title='Perfil' />
        <Modal.Body>
          <div className='flex gap-4'>
            <button className='mt-4 mb-4  px-2 py-1 border-2 border-primary_200 text-text_accent opacity-100' onClick={() => { setModify(!modify) }}>
              {modify ? 'Cancelar' : 'Modificar'}
            </button>
          <button className='mt-4 mb-4  px-2 py-1 border-2 border-primary_200 text-text_accent opacity-100' onClick={handlePageChange}>Mis comentarios</button>
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
