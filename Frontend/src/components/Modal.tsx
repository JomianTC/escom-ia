import CustomSelect from '@/pages/Private/Profesores/components/MultipleSelect'
import { closeModal } from '@/store/slices/procedureModalSlice'
import { Field, Form, Formik } from 'formik'
import { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MyTextInput } from './InputText'
import { StarRating } from './StarRating'
import { comentarioEsquema } from '@/pages/Schemas'

const initialModalState = {
  isOpen: false,
  handleClose: () => {}
}

const ModalContext = createContext(initialModalState)
interface ModalProps {
  children: React.ReactNode
  open?: boolean
  type?: string
  trigger?: React.ReactNode
}
export default function Modal ({ children, type = 'default', open = false, trigger }: ModalProps) {
  const [isOpen, setIsOpen] = useState(open)
  const handleClose = () => {
    setIsOpen(!isOpen)
    document.querySelector('#root')?.classList.toggle('open')
  }
  const dispatch = useDispatch()

  useEffect(() => {
    const closeModalOnResize = () => {
      setIsOpen(false)
      document.querySelector('#root')?.classList.remove('open')
      dispatch(closeModal())
    }
    window.addEventListener('resize', closeModalOnResize)
    if (type === 'timer') {
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 1000)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', closeModalOnResize)
      }
    }
    return () => { window.removeEventListener('resize', closeModalOnResize) }
  }, [type, isOpen])

  return (
        <ModalContext.Provider value={{ handleClose, isOpen }}>
      <>
            {trigger}
                <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`bg-red-300 flex justify-center items-center  ${!isOpen ? 'hidden' : 'h-screen w-screen bg-zinc-800/60 fixed top-0 left-0 open p-4 overflow-y-scroll'}`}>
                    <div className="modal-content relative p-4
                     w-72 sm:w-[460px]  sm:max-h-full bg-bg_300 z-50 rounded-xl text-white flex flex-col justify-center items-center">
                                    {children}
                    </div>
                </div>
            </>
        </ModalContext.Provider>
  )
}

export function Title ({ title }: { title?: string }) {
  return <h1 className="text-xl sm:text-4xl font-bold border-b-2 text-left py-4">{title}</h1>
}

export function Body ({ children }: { children: React.ReactNode }) {
  return (
        <>
        { children }
        </>
  )
}

export function Controls () {
  const { handleClose, isOpen } = useContext(ModalContext)
  return <button onClick={handleClose} className="rounded-xl white-border bg-bg_100 w-10 h-10 absolute top-0 left-0 -translate-y-4 -translate-x-4 flex items-center justify-center font-extrabold hover:bg-bg_100 cursor-pointer opacity-100">
        {isOpen ? 'X' : 'Abrir'}
    </button>
}

function TramiteControl () {
  const { isOpen } = useContext(ModalContext)
  const dispatch = useDispatch()
  return <button onClick={() => dispatch(closeModal())} className="rounded-xl white-border bg-bg_100 w-10 h-10 absolute top-0 left-0 -translate-y-4 -translate-x-4 flex items-center justify-center font-extrabold hover:bg-bg_100 cursor-pointer opacity-100">
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
  return (
        <form className="w-full flex flex-col justify-start text-white max-h-56 overflow-y-scroll custom-scrollbar mt-6 gap-6" onSubmit={handleSubmit}>
            {children}
            <button className='inline-block bg-bg_200 py-2 px-4 w-fit rounded-2xl' type="submit" onClick={handleClose}>Confirmar</button>
        </form>
  )
}

export function ModalTrigger ({ children, className }: { children: React.ReactNode, className?: string }) {
  const { handleClose } = useContext(ModalContext)
  return (
    <button onClick={handleClose} className={ className}>
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

interface CommentFormikFormProps {
  handleSubmit: (values: any) => void
  data: Array<{
    label: string
    value: string
  }>
}

// Some dummy language data
// const languageOptions = [
//   {
//     label: 'Chinese',
//     value: 'zh-CN'
//   },
//   {
//     label: 'English (US)',
//     value: 'en-US'
//   },
//   {
//     label: 'English (GB)',
//     value: 'en-GB'
//   },
//   {
//     label: 'French',
//     value: 'fr-FR'
//   },
//   {
//     label: 'Spanish',
//     value: 'es-ES'
//   }
// ]
function CommentFormikForm ({ handleSubmit, data }: CommentFormikFormProps) {
  const { handleClose } = useContext(ModalContext)
  return (
  <Formik
      initialValues={{
        comentario: '',
        tags: [],
        puntuacion: 0
      }}
      onSubmit={(values, actions) => {
        handleSubmit(values)
        handleClose()
        // Reinitialize the form
        actions.resetForm()
      }}
      validationSchema={ comentarioEsquema}
    >
    {({ handleSubmit }) => (
      <Form onSubmit={handleSubmit} className='mt-8 w-full px-4 flex flex-col gap-4'>
        <MyTextInput label="Comment" name="comentario" type="text" placeholder="Tu opinion..." />
          <Field
                  className="custom-select text-black"
                  name="tags"
                  options={data}
                  component={CustomSelect}
                  placeholder="Select multi languages..."
                  isMulti={true}
          />

          <StarRating name={'puntuacion' } />
          <button type='submit' >Confirmar</button>
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
Modal.CommentForm = CommentFormikForm
Modal.TramiteControl = TramiteControl
