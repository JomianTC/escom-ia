import { StudentForm } from '@/pages/Register/StudentForm/StudentForm'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { LEVEL_ACCESS } from '@/types/index'
import { useState } from 'react'
import Modal, { AdminInfo, ModalTrigger, StudentInfo } from './Modal'

export default function EditInfoModal () {
  const { rol } = useAppSelector((state) => state.auth)
  const { nombres, fotoPerfil } = useAppSelector((state) => state.user)
  const [modify, setModify] = useState(false)
  const isStudent = rol === LEVEL_ACCESS.STUDENT
  return (
    <Modal trigger={<ModalTrigger className={'profile-icon w-12 h-12 absolute bottom-0 sm:relative opacity-100'}>
    {rol === LEVEL_ACCESS.STUDENT && (<img src={fotoPerfil} alt={nombres} />)}
  </ModalTrigger>
     }>
      <Modal.Title title='Perfil' />
      <Modal.Body>
        <button className='mt-4 mb-4  px-2 py-1 border-2 border-primary_200 text-zinc-800' onClick={() => { setModify(!modify) }}>
          {modify ? 'Cancelar' : 'Modificar'}
        </button>
          {modify
            ? (<StudentForm isUpdate/>)
            : isStudent ? <StudentInfo /> : <AdminInfo />
            }
        </Modal.Body>
      <Modal.Controls />
  </Modal>
  )
}
