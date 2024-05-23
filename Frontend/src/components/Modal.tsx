import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { changeState, closeModal } from '@/store/slices/uiSlice'
import { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react'

const initialModalState = {
  isOpen: false,
  handleClose: () => { }
}

const ModalContext = createContext(initialModalState)
interface ModalProps {
  children: React.ReactNode
  open?: boolean
  type?: string
  trigger?: React.ReactNode
}
export default function Modal ({ children, type = 'default', open = false, trigger }: ModalProps) {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(open)
  const { changeState: changeModalState } = useAppSelector((state) => state.ui)
  const outsideContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (changeModalState) {
      setIsOpen(true)
      document.querySelector('#root')?.classList.add('open')
    } else {
      setIsOpen(false)
      document.querySelector('#root')?.classList.remove('open')
    }
    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && changeModalState) {
        handleClose()
      }
    }
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (outsideContainerRef.current === e.target) {
        handleClose()
      }
    }
    window.addEventListener('keydown', closeModalOnEscape)
    window.addEventListener('click', closeOnOutsideClick)
    return () => {
      window.removeEventListener('keydown', closeModalOnEscape)
      window.removeEventListener('click', closeOnOutsideClick)
    }
  }, [changeModalState])

  useEffect(() => {
    const closeModalOnResize = () => {
      setIsOpen(false)
      dispatch(closeModal())
      document.querySelector('#root')?.classList.remove('open')
      // dispatch(closeModal())
    }

    window.addEventListener('resize', closeModalOnResize)
    return () => {
      window.removeEventListener('resize', closeModalOnResize)
    }
  }, [type])

  const handleClose = () => {
    if (!changeModalState) document.querySelector('#root')?.classList.add('open')
    else document.querySelector('#root')?.classList.remove('open')
    dispatch(changeState())
    console.log(changeModalState)
  }

  return (
    <ModalContext.Provider value={{ handleClose, isOpen }}>
      <>
        {trigger}
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`bg-red-300 flex justify-center items-center  ${!isOpen ? 'hidden' : 'h-screen w-screen bg-zinc-800/60 fixed top-0 left-0 open p-4 overflow-y-scroll z-[1000]'}`} ref={outsideContainerRef}>
          <div className="modal-content relative p-4
                     w-full md:w-[460px]  sm:max-h-full bg-bg_300  rounded-xl text-primary_300 flex flex-col justify-center items-center z-[99999999]">
            {children}
          </div>
        </div>
      </>
    </ModalContext.Provider>
  )
}

export function Title ({ title }: { title?: string }) {
  return <h1 className="text-xl sm:text-4xl font-bold border-b-2 text-left py-4 mb-4 text-primary_300">{title}</h1>
}

export function Body ({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}

export function Controls () {
  const { handleClose, isOpen } = useContext(ModalContext)
  return <button onClick={() => {
    handleClose()
  }} className="rounded-xl white-border bg-bg_100 w-10 h-10 absolute top-0 left-0 -translate-y-4 -translate-x-4 flex items-center justify-center font-extrabold hover:bg-bg_100 cursor-pointer opacity-100">
    {isOpen ? 'X' : 'Abrir'}
  </button>
}

function TramiteControl () {
  const { isOpen, handleClose } = useContext(ModalContext)
  return <button onClick={() => {
    // dispatch(changeState())
    handleClose()
  }} className="rounded-xl white-border bg-bg_100 w-10 h-10 absolute top-0 left-0 -translate-y-4 -translate-x-4 flex items-center justify-center font-extrabold hover:bg-bg_100 cursor-pointer opacity-100">
    {isOpen ? 'X' : 'Abrir'}
  </button>
}

export function Trigger ({ children }: { children: React.ReactNode }) {
  return (
    { children }
  )
}

export function ModalForm ({ children, handleSubmit }: { children: React.ReactNode, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  const { handleClose } = useContext(ModalContext)
  const dispatch = useAppDispatch()
  return (
    <form className="w-full flex flex-col justify-start text-white max-h-56 overflow-y-scroll custom-scrollbar mt-6 gap-6" onSubmit={handleSubmit}>
      {children}
      <button className='inline-block bg-bg_200 py-2 px-4 w-fit rounded-2xl' type="submit"
        onClick={() => {
          dispatch(closeModal())
          handleClose()
        }}>Confirmar</button>
    </form>
  )
}
interface ModalTriggerProps {
  children: React.ReactNode
  className?: string
}
export const ModalTrigger = forwardRef(function ModalTrigger ({ children, className }: ModalTriggerProps, ref?: React.Ref<HTMLButtonElement>) {
  const { handleClose } = useContext(ModalContext)
  return (
    <button onClick={() => { handleClose() }} className={className} ref={ref}>
      {children}
    </button>
  )
})

export function ModalImageCover ({ src = '/placeholder-docs.png', alt }: { src?: string, alt: string }) {
  return <div className='w-full max-h-44 overflow-hidden bg-cover'>
    <img className="w-full  bg-cover" src={src} alt={alt} />
  </div>
}

export function ModalLogo () {
  return (
    <img src="/icons/logoCompleto.webp" alt="Imagen de ESCOM" className="w-32 sm:w-40 my-4   " />
  )
}

export function AdminInfo () {
  const {
    foto_perfil: fotoPerfil,
    nombres,
    email,
    area,
    id
  } = useAppSelector((state) => state.user)
  return (
    <article className='flex flex-col w-full md:justify-center items-center  h-full'>
      <img src={fotoPerfil} alt={nombres} className='w-12 h-12 sm:w-28 sm:h-28 self-center' />
      <div className='max-w-screen-sm w-full '>
        <p className='text-text_200 text-lg text-left' >
          <span className="font-bold text-text_accent block">Nombre:</span>
          {nombres}</p>
        <p className='text-text_200 text-lg text-left' >
          <span className="font-bold text-text_accent block">Id:</span>
          {id}</p>
        <p className='text-text_200 text-lg text-left' >
          <span className="font-bold text-text_accent block ">Area:</span>
          {area}</p>
        <p className='text-text_200 text-lg text-left' >
          <span className="font-bold text-text_accent block">Email </span>
          {email}</p>
      </div>
    </article>)
}

export function StudentInfo () {
  const {
    foto_perfil: fotoPerfil,
    nombres,
    apellidos,
    boleta,
    programa_academico: programaAcademico,
    email_academico: emailAcademico,
    email_recuperacion: emailRecuperacion
  } = useAppSelector((state) => state.user)
  return (
    <div className='flex flex-col w-full'>
      <img src={fotoPerfil} alt={nombres + apellidos } className='w-12 h-12 sm:w-28 sm:h-28 self-center' />
      <p className='text-text_200 text-lg text-left' >
        <span className="font-bold text-text_accent block">Nombre:</span>
        {nombres} {apellidos}</p>
      <p className='text-text_200 text-lg text-left' >
        <span className="font-bold text-text_accent block">Boleta:</span>
        {boleta}</p>
      <p className='text-text_200 text-lg text-left' >
        <span className="font-bold text-text_accent block ">Programa Academico:</span>
        {programaAcademico}</p>
      <p className='text-text_200 text-lg text-left' >
        <span className="font-bold text-text_accent block">Email Academico: </span>
        {emailAcademico}</p>
      <p className='text-text_200 text-lg text-left' >
        <span className="font-bold text-text_accent block">Email Recuperacion:</span>
        {emailRecuperacion}</p>
    </div>

  )
}
Modal.Title = Title
Modal.Body = Body
Modal.Controls = Controls
Modal.Form = ModalForm
Modal.Image = ModalImageCover
Modal.Logo = ModalLogo
Modal.TramiteControl = TramiteControl
