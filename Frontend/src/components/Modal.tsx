import { useCreateTeacher } from '@/api/teachers/use-create-teacher'
import { useEditTeacher } from '@/api/teachers/use-edit-teacher'
import { AREAS, GRADOS_ACADEMICOS, profesorEsquema } from '@/pages/Schemas'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { changeState, closeModal } from '@/store/slices/uiSlice'
import { type TeacherFormData } from '@/types/index'
import { Field, Form, Formik } from 'formik'
import { createContext, useContext, useEffect, useState } from 'react'
import { MyTextInput } from './InputText'

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

  const handleClose = () => {
    dispatch(changeState())
    document.querySelector('#root')?.classList.toggle('open')
  }

  useEffect(() => {
    if (changeModalState) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [changeModalState])

  useEffect(() => {
    const closeModalOnResize = () => {
      setIsOpen(false)
      dispatch(closeModal())
      document.querySelector('#root')?.classList.remove('open')
      // dispatch(closeModal())
    }
    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        dispatch(closeModal())
        document.querySelector('#root')?.classList.remove('open')
        // dispatch(closeModal())
      }
    }
    window.addEventListener('resize', closeModalOnResize)
    window.addEventListener('keydown', closeModalOnEscape)
    return () => { window.removeEventListener('resize', closeModalOnResize) }
  }, [type])

  return (
    <ModalContext.Provider value={{ handleClose, isOpen }}>
      <>
        {trigger}
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`bg-red-300 flex justify-center items-center  ${!isOpen ? 'hidden' : 'h-screen w-screen bg-zinc-800/60 fixed top-0 left-0 open p-4 overflow-y-scroll z-[1000]'}`}>
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

export function ModalTrigger ({ children, className }: { children: React.ReactNode, className?: string }) {
  const { handleClose } = useContext(ModalContext)
  return (
    <button onClick={() => { handleClose() }} className={className}>
      {children}
    </button>
  )
}

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
    <div className='flex flex-col w-full'>
      <img src={fotoPerfil} alt={nombres } />
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
    </div>)
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

interface MyFormValues {
  nombre: string
  area: string
  grado_academico: typeof GRADOS_ACADEMICOS[number]
  email: string
  contacto: string
  sexo?: 'masculino' | 'femenino'
}
type Action = 'create' | 'update'
const defaultValues: MyFormValues = {
  nombre: 'Profesor Cordero',
  area: '',
  grado_academico: '',
  email: 'profecordero@gmail.com',
  contacto: 'profecordero@gmail.com',
  sexo: 'masculino'
}
export function ProfesorForm ({ action = 'create', styles = '', data = defaultValues }: { action?: Action, styles?: string, data?: MyFormValues }) {
  const initialValues: MyFormValues = { sexo: 'masculino', ...data }
  const teacher = useCreateTeacher()
  const teacherUpdate = useEditTeacher()
  const handleCreateTeacher = async (values: TeacherFormData & { sexo: 'masculino' | 'femenino', id: string, foto_perfil: string, calificacion: number }) => {
    if (action === 'update') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await teacherUpdate.mutateAsync(values)
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await teacher.mutateAsync(values)
  }

  const { handleClose } = useContext(ModalContext)
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async function (values, actions) {
        await handleCreateTeacher({ sexo: 'masculino', foto_perfil: '', calificacion: 10, id: '', ...values })
        handleClose()
        // Reinitialize the form
        actions.resetForm()
      }}
      validationSchema={profesorEsquema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className={`mt-0 w-full px-4 flex flex-col gap-4 max-h-80 overflow-y-scroll ${styles}`}>
          {teacherUpdate.isPending && <p>Actualizando...</p>}
          {teacher.isPending && <p>Actualizando...</p>}
          <MyTextInput label="Nombre" name="nombre" type="text" placeholder="Victoria Isabel Blas Pérez" />
          <div className='flex gap-6'>
            <label>
                <Field type="radio" name="sexo" value="masculino" />
                H
              </label>
              <label>
                <Field type="radio" name="sexo" value="femenino" />
                F
              </label>
          </div>
          <label htmlFor='area' >Area</label>
          <Field id='area' as="select" name="area" className="text-text_accent py-2 -mt-3">
            {AREAS.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </Field>
          <label htmlFor='grado' >Grado Academico</label>
          <Field id='grado' as="select" name="grado_academico" className="text-text_accent py-2 -mt-3">
            {GRADOS_ACADEMICOS.map((grado) => (
              <option key={grado} value={grado}>{grado}</option>
            ))}
          </Field>
          <MyTextInput label="Email" name="email" type="text" placeholder="victoria@outlook.ipn.mx" />
          <MyTextInput label="Contacto" name="contacto" type="text" placeholder="5543456534" />
          <button type='submit' className='white-border w-fit' >Confirmar</button>
        </Form>
      )}
    </Formik>
  )
}

Modal.Title = Title
Modal.Body = Body
Modal.Controls = Controls
Modal.Form = ModalForm
Modal.Image = ModalImageCover
Modal.Logo = ModalLogo
Modal.TramiteControl = TramiteControl
Modal.Profesor = ProfesorForm
