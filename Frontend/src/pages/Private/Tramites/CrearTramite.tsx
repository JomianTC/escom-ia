import { useCreateProcedure } from '@/api/procedures/use-create-procedure'
import { useUpdateProcedure } from '@/api/procedures/use-update-procedure'
import { useGetRequirments } from '@/api/requirments/use-get-requirmets'
import { AddProcedure, DeleteProcedure, EditTagIcon } from '@/components/icons/Icons'
import { MyTextInput } from '@/components/InputText'
import { procedureEsquema } from '@/pages/Schemas'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { type CreateProcedure, type Procedure } from '@/types/api-responses'
import { ErrorMessage, Field, FieldArray, type FieldProps, Form, Formik, useField } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { CustomSelect } from '../Profesores/components/MultipleSelect'
import { ReturnButton } from '@/components/ReturnButton'
import { useState } from 'react'

const MyDatePicker = ({ name = '', title = '' }) => {
  const [field, meta, helpers] = useField(name)

  const { value } = meta
  const { setValue } = helpers

  return (
    <div >
      <label htmlFor={field.name} className='flex flex-col gap-2'>
        <span className='font-semibold'>{title}</span>
        <DatePicker
          autoComplete='off'
          minDate={new Date()}
          {...field}
          selected={value}
          name={field.name}
          onChange={async (date) => await setValue(date)}
          className='input-procedure w-full px-2 py-1 border-2 border-accent_100  text-text_100 font-semibold  valid:border-accent_200 valid:text-text_200 focus:bg-primary_op_100/10 focus:border-primary_200 focus:text-primary_200'
        />
        <ErrorMessage name={field.name} />
      </label>
    </div>
  )
}

// const MyCustomCheckbox = ({ name = '', title = '' }) => {
//   const [field, meta, helpers] = useField(name)
//   const { value } = meta
//   const { setValue } = helpers

//   return (
//     <label htmlFor={field.name} className='flex gap-1 flex-col container_checkbox items-start justify-center'>
//       <span className='font-semibold'>{title}</span>
//       <input
//         type='checkbox'
//         id={field.name}
//         name={field.name}
//         checked={value === 'false' ? false : value}
//         onChange={async (e) => await setValue(e.target.checked)}
//       />
//       <div className="checkmark"></div>
//     </label>
//   )
// }

export function CrearTramite ({ children }: { children?: React.ReactNode }) {
  const { id } = useParams()
  const { data, isLoading } = useGetRequirments()
  const isEditting = id !== undefined
  const getTramiteToEdit = useAppSelector((state) => state.procedure)
  const [showAddLink, setShowAddLink] = useState(false)
  const initialData = isEditting
    ? {
        ...getTramiteToEdit,
        requerimentos: [],
        links: getTramiteToEdit.links.map(value => {
          const [link, title] = value.split(',')
          return { link, title }
        })
      }
    : {
        id: '',
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaTermino: '',
        esInformativo: false,
        requerimentos: [],
        links: []
      }

  const createProcedure = useCreateProcedure()
  const updateProcedure = useUpdateProcedure(id ?? '')
  const navigate = useNavigate()

  return (
    <div className='flex overflow-y-scroll h-full py-1 w-full custom-scrollbar relative procedure-form z-[500]'>
      <div className='mx-auto'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-accent_100 grow '>{isEditting ? 'Editar' : 'Crear Nuevo'}</h1>
          { children }
          <ReturnButton styles='-top-10 -left-8' />
        </div>
        <Formik initialValues={{ ...initialData }}
          validationSchema={procedureEsquema}
          onSubmit={async (values, actions) => {
            console.log(values)
            if (isEditting) {
              updateProcedure.mutateAsync(values as unknown as Procedure).then(() => {
                navigate('/private/tramites')
              }).catch((err) => {
                console.log(err)
              })
            } else {
              await createProcedure.mutateAsync(values as unknown as CreateProcedure).then(() => {
                actions.resetForm()
                navigate('/private/tramites')
              }).catch((err) => {
                console.log(err)
              })
            }
          }}
        >
          {({ values }) => (
            <Form className='relative flex flex-col gap-3 z-[3000] w-72 xs:w-80 sm:max-w-lg sm:w-full sm:min-w-[600px] border-4 border-text_100 rounded-xl  content-center  py-8 px-6  form-glass'>
              {showAddLink
                ? (
                  <>
                    <FieldArray name="links">
                      {({ push, remove }) => (
                        <div>
                          {values.links.map((_, index) => (
                            <div key={index}>
                              <div className='flex flex-col max-w-72 '>
                                <label htmlFor={`links.${index}.title`}><button type="button" onClick={() => remove(index)}>
                                <DeleteProcedure styles='w-6 h-6 fill-primary_200 stroke-primary_300 hover:fill-red-600 hover:stroke-primary_100 inline-block' />
                              </button> Título</label>
                                <Field placeholder="Carta de termino" name={`links.${index}.title`} className='border-2 border-primary_100 py-1 px-2' />
                                <ErrorMessage name={`links.${index}.title`} />
                              </div>
                              <div className='flex flex-col'>
                                {/* <label className='font-semibold text-primary_200 text-lg' htmlFor={`links.${index}.link`}>Link:</label> */}
                                <Field className='py-1 px-2 border-primary_100 border-2 ' name={`links.${index}.link`} placeholder='https://www.escom.ipn.mx/SSEIS/apoyoseducativos/docs/Registro_de_SS_presencial_dentro_de_la_ESCOM.JPG'/>
                                <ErrorMessage name={`links.${index}.link`} />
                              </div>
                            </div>
                          ))}
                          <button type="button" onClick={() => { push({ link: '', title: '' }) }}>
                            <AddProcedure styles='w-10 h-10' />
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </>
                  )
                : (
                  <>
                    <MyTextInput type='text' name='nombre' label='Titulo' />
                    {/* <Field name='text' component={RichTextEditor} /> */}
                    <div className='flex flex-col  gap-1 md:flex-row '>
                      {/* <MyCustomCheckbox name='esInformativo' title={'¿Informativo?'} /> */}
                      <MyDatePicker name='fechaInicio' title='Fecha de Inicio' />
                      <MyDatePicker name='fechaTermino' title='Fecha de Termino' />
                    </div>
                    {isLoading
                      ? <p>Cargando...</p>
                      : (
                        <div className='flex items-center gap-4 flex-wrap'>
                          <Field name='requerimentos'
                            component={CustomSelect}
                            options={data}
                            isMulti
                            isCreatable
                            placeholder='Selecciona o crea uno nuevo'
                          />
                          <NavLink to='/private/dashboardadmin/editarTags' className='text-primary_200 font-semibold hover:underline'>
                            <EditTagIcon styles='w-6 h-6 fill-none stroke-primary_300  hover:stroke-primary_100 inline-block' />
                          </NavLink>
                          <ErrorMessage className='grow w-full text-red-500 font-bold -mt-4  ' component={'p'} name='requerimentos' />
                        </div>
                        )}
                    <Field name="descripcion">
                      {({ field }: FieldProps) => (
                        <>
                          <ReactQuill placeholder='Los 2 primeros renglones son los que se muestran en la ventana anterior. ¡Hazlos llamativos!' value={field.value} onChange={field.onChange(field.name)} className='h-36 mb-4' />
                          <ErrorMessage name={field.name} />
                        </>
                      )}
                    </Field>
                  </>
                  )}
              <button className='mt-20 md:mt-6  border-4 border-primary_100 py-1 font-semibold ' type='button' onClick={() => { setShowAddLink(!showAddLink) }}>{
                showAddLink ? 'Regresar a detalles' : 'Agregar Links'
              }</button>
              <button className='mt-2 white-border w-fit self-center' type='submit'>Confirmar</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
