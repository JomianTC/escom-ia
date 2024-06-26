import { useCreateComment } from '@/api/comments/use-create-comment'
import { CustomSelect } from '@/pages/Private/Profesores/components/MultipleSelect'

import { useWordByWord } from '@/pages/hooks/useWordByWord'
import { comentarioEsquema } from '@/pages/Schemas'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { closeCommentBox, openCommentBox } from '@/store/slices/uiSlice'
import { Field, Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ActionButton } from './ActionButton'
import { ApiLoader } from './ApiLoader'
import { MyTextArea } from './InputText'
import { StarRating } from './StarRating'

interface CommentFormikFormProps {
  data: Array<{
    label: string
    value: string
  }>
  profesorName: string
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
export function CommentFormikForm ({ data, profesorName }: CommentFormikFormProps) {
  const { id } = useParams()
  const createComment = useCreateComment()
  const { commentBoxActive } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      if (commentBoxActive) dispatch(closeCommentBox())
    }
  }, [])

  const { iaClicked, setIaClicked, partialResponse, showingPartial, startIASubmit, handleStateReset } = useWordByWord()

  const startSubmit = async (values: { comentario: string, tags: string[] | never[], puntuacion: number, id_profesor?: string }) => {
    const comment: {
      id_profesor: string
      puntuacion: number
      comentario: string
      tags: string[]
      nombre?: string
    } = {
      ...values,
      id_profesor: id ?? ''
    }
    const { nombre, ...commentRest } = comment
    if (commentRest.comentario.trim() === '' && partialResponse !== '') {
      commentRest.comentario = partialResponse
    }
    if (commentRest.comentario.trim() === '') {
      toast.error('El comentario no puede estar vacío')
      return
    }
    await createComment.mutateAsync(commentRest)
  }

  return (createComment.isPending
    ? <h1 className='text-4xl '> <ApiLoader /></h1>
    : <div className='flex gap-6'>
      <div className={` ${commentBoxActive ? 'my-4 w-full h-fit px-4 flex flex-col gap-4 relative z-[700] comment-box  md:max-w-xl py-1 active ' : 'w-32 h-12  rounded-lg bg-bg_200 border-2 border-primary_200 relative overflow-hidden deactivated'} comment-form `}>
        <Formik
          initialValues={{
            comentario: '',
            tags: [],
            puntuacion: 0,
            nombre: ''
          }}
          onSubmit={async (values, actions) => {
            if (iaClicked) {
              // values to IA array of tags []
              const tags: string[] = values.tags.map(tag => data.find(tagData => tagData.value === tag)?.label) as string[]
              await startIASubmit({
                type: 'comment',
                values: { tags, nombre: profesorName }
              }) // Llama a la función con el parámetro adecuado
            } else {
              await startSubmit(values) // Llama a la función con el parámetro adecuado
            }
            // Reinitialize the form
            // actions.resetForm()
            actions.setSubmitting(false)
          }}
          validationSchema={comentarioEsquema}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ handleSubmit, isSubmitting, isValid, resetForm }) => (
            <>
              <ActionButton callback={() => {
                commentBoxActive ? dispatch(closeCommentBox()) : dispatch(openCommentBox())
                resetForm()
              }} text={commentBoxActive ? 'X' : 'Comentar'}
                extraStyles={`p-0 border-none absolute  font-bold uppercase cursor-pointer  ${commentBoxActive ? '-top-2 -right-4 w-10 h-10  border-4  text-black flex justify-center items-center button-reset bg-primary_op_100/60  hover:bg-primary_100 rounded-lg active ' : 'top-[0%] left-[0%] w-full h-full'}`}
              />
              <Form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {commentBoxActive && (
                  <>
                    <MyTextArea label="Comentario" name="comentario" type="text" placeholder="Escribe un comentario..." className='mt-4' />
                    {showingPartial && <p className='italic font-bold '>Te recomiendo lo siguiente: (Aún puedes utilizar un comentario personalizado) </p>}
                    {showingPartial &&
                      <>
                        <p className='italic'> &#34; {partialResponse} &rdquo; </p>
                        <button className='border-2 border-primary_200 px-2 py-1 font-bold w-fit rounded-lg' onClick={() => { handleStateReset() }}>Cancelar</button>
                      </>
                    }
                    <div>
                      <Field
                        className="grow"
                        name="tags"
                        options={data}
                        component={CustomSelect}
                        placeholder="Selecciona algún tag... o crea uno nuevo"
                        isMulti={true}
                        isTagSelection={true}
                        isCreatable={true}
                      />
                    </div>
                    <StarRating name={'puntuacion'} />
                    <div className="flex gap-4 -z-10 w-full">

                      <button className={`outline-none w-fit self-start px-4 py-2 rounded-lg font-bold bg-bg_300 relative white-border ${(isSubmitting) ? 'opacity-50' : ''}`} type='submit' disabled={isSubmitting} >
                        {showingPartial ? 'Usar respuesta' : 'Confirmar'}
                      </button>

                      <button className={`outline-none w-fit self-start px-4 py-2 rounded-lg font-bold bg-bg_300 relative white-border hover:shadow-none hover:bg-primary_200 hover:text-black transition-colors ${(isSubmitting) ? 'opacity-50' : ''}`} type='submit' disabled={isSubmitting} onClick={async () => {
                        isValid && setIaClicked(true)
                      }}>Utilizar IA</button>

                      {isSubmitting && <div className='text-2xl'><ApiLoader /> </div>}
                    </div>
                  </>
                )}
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}
