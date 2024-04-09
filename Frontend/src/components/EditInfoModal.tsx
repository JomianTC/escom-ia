import { StudentForm } from '@/pages/Register/StudentForm/StudentForm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Modal, { ModalTrigger } from './Modal'

export default function EditInfoModal () {
  // Arreglar  modal aqui para que se muestre la info del usuario
  const {
    foto_perfil: fotoPerfil,
    nombres,
    apellidos,
    boleta,
    programa_academico: programaAcademico,
    email_academico: emailAcademico,
    email_recuperacion: emailRecuperacion
  } = useSelector((state) => state.user)
  const [modify, setModify] = useState(false)
  return (
    <Modal trigger={<ModalTrigger className={'profile-icon w-12 h-12 absolute bottom-0 sm:relative opacity-100'}>
    <img src={fotoPerfil} alt={nombres} />
  </ModalTrigger>
     }>
      <Modal.Title title='Perfil' />
      <Modal.Body>
        <button className='mt-4 mb-4  px-2 py-1 border-2 border-white ' onClick={() => { setModify(!modify) }}>
          {modify ? 'Cancelar' : 'Modificar'}
        </button>
          {modify
            ? (<StudentForm isUpdate/>)
            : <div className='flex flex-col w-full'>
                <p className='text-lg text-left' >
                    <span className="font-bold text-primary_300 block">Nombre:</span>
                    {nombres} {apellidos}</p>
                <p className='text-lg text-left' >
                    <span className="font-bold text-primary_300 block">Boleta:</span>
                     {boleta}</p>
                <p className='text-lg text-left' >
                    <span className="font-bold text-primary_300 block ">Programa Academico:</span>
                     {programaAcademico}</p>
                <p className='text-lg text-left' >
                    <span className="font-bold text-primary_300 block">Email Academico: </span>
                    {emailAcademico}</p>
                <p className='text-lg text-left' >
                    <span className="font-bold text-primary_300 block">Email Recuperacion:</span>
                       {emailRecuperacion}</p>
              </div>}
        </Modal.Body>
      <Modal.Controls />
  </Modal>
  )
}
