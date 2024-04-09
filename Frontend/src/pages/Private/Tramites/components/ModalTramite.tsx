import Modal from '@/components/Modal'
import { useSelector } from 'react-redux'

export function ModalTramite () {
  const {
    id,
    nombre,
    descripcion,
    fechaInicio,
    fechaTermino,
    estado,
    esInformativo,
    isModalOpen
  } = useSelector(store => store.procedure)
  return (
    <Modal open={isModalOpen}>
        <Modal.Image alt="escom_plus_logo" />
        <Modal.Title title={nombre} />
        <Modal.Logo />
        <Modal.Body>
              <p>{ descripcion}</p>
              <p>Links: </p>
              <details>
                <summary>Formulario 1</summary>
                <iframe
                  src='https://docs.google.com/forms/d/e/1FAIpQLSfztCVy2jy-Ob1W0hS6d34PJrpj2-aRuvzEa9UEwM2F6faUcg/viewform?usp=sf_link'
                  title='Formulario 1'
                  width='100%'
                  height='200'
                  loading='lazy'
                />
              </details>
        </Modal.Body>
        <Modal.TramiteControl />
      </Modal>
  )
}
