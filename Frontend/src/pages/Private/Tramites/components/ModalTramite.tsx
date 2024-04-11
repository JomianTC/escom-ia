import Modal from '@/components/Modal'
import { useAppSelector } from '@/store/hooks/useAppSelector'

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
  } = useAppSelector((state) => state.procedure)
  return (
    <Modal open={isModalOpen}>
        <Modal.Image alt="escom_plus_logo" />
        <Modal.Title title={nombre} />
      <Modal.Body>
        <div className='flex flex-col gap-6 w-full'>
              <p>{ descripcion}</p>
              <p className='font-bold text-left '>Links: </p>
              <details className='px-4 py-1 border-2 rounded-lg w-full'>
                <summary>Formulario 1</summary>
                <iframe
                  src='https://docs.google.com/forms/d/e/1FAIpQLSfztCVy2jy-Ob1W0hS6d34PJrpj2-aRuvzEa9UEwM2F6faUcg/viewform?usp=sf_link'
                  title='Formulario 1'
                  width='100%'
                  height='200'
                  loading='lazy'
                />
          </details>
          <details className='px-4 py-1 border-2 rounded-lg w-full'>
                <summary>Formulario 2</summary>
                <iframe
                  src='https://docs.google.com/forms/d/e/1FAIpQLSfztCVy2jy-Ob1W0hS6d34PJrpj2-aRuvzEa9UEwM2F6faUcg/viewform?usp=sf_link'
                  title='Formulario 1'
                  width='100%'
                  height='200'
                  loading='lazy'
                />
              </details>
        </div>
        </Modal.Body>
        <Modal.TramiteControl />
      </Modal>
  )
}
