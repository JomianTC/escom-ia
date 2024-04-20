import { useCreateProcedure } from '@/api/procedures/use-create-procedure'
import { useUpdateProcedure } from '@/api/procedures/use-update-procedure'
import { useGetRequirments } from '@/api/requirments/use-get-requirmets'
import { AddProcedure, DeleteProcedure } from '@/components/icons/Icons'
import { MyTextInput } from '@/components/InputText'
import { procedureEsquema } from '@/pages/Schemas'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { type CreateProcedure, type Procedure } from '@/types/api-responses'
import { Field, FieldArray, type FieldProps, Form, Formik, useField } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useParams } from 'react-router-dom'
import { CustomSelect } from '../Profesores/components/MultipleSelect'

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
          className='input-procedure w-full px-2 py-1 border-2 border-accent_100 rounded-lg bg-primary_op_100/10 text-text_100 font-semibold valid:bg-primary_op_100/30 valid:border-accent_200 valid:text-text_200 focus:bg-primary_op_100/20 focus:border-primary_200 focus:text-primary_200'
        />
        </label>
    </div>
  )
}

const MyCustomCheckbox = ({ name = '', title = '' }) => {
  const [field, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers

  return (
      <label htmlFor={field.name} className='flex gap-2 container_checkbox'>
      <span>{title}</span>
        <input
          type='checkbox'
          id={field.name }
          name={field.name }
          checked={value === 'false' ? false : value}
          onChange={async (e) => await setValue(e.target.checked)}
        />
      <div className="checkmark"></div>
      </label>
  )
}

export function CrearTramite () {
  const { id } = useParams()
  const { data, isLoading } = useGetRequirments()
  console.log(data)

  const isEditting = id !== undefined
  const initialData = isEditting
    ? useAppSelector((state) => state.procedure)
    : {
        id: '',
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaTermino: '',
        esInformativo: false,
        requerimentos: [],
        links: [],
        estado: true
      }

  const createProcedure = useCreateProcedure()
  const updateProcedure = useUpdateProcedure(id ?? '')

  return (
    <div className='flex overflow-y-scroll h-full py-1 w-full custom-scrollbar relative procedure-form z-[500]'>
      <div className='mx-auto'>
        <h1 className='font-bold text-accent_100 text-center'>{isEditting ? 'Editar' : 'Crear Nuevo' }</h1>
        <Formik initialValues={{ ...initialData }}
          validationSchema={procedureEsquema}
          onSubmit={(values, actions) => {
            console.log(values)

            if (isEditting) {
              updateProcedure.mutate(values as unknown as Procedure)
            } else {
              createProcedure.mutate(values as unknown as CreateProcedure)
              console.log(new Date(values.fechaInicio))
              actions.resetForm()
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className='relative flex flex-col gap-3 z-[3000] w-72 xs:w-80 sm:max-w-lg sm:w-full border-4 border-text_100 rounded-xl  content-center  py-8 px-6  form-glass'>
              <MyTextInput type='text' name='nombre' label='Titulo' />
              {/* <Field name='text' component={RichTextEditor} /> */}
              <MyCustomCheckbox name='esInformativo' title={'Es Informativo'} />
              <div className='flex gap-2'>
                <MyDatePicker name='fechaInicio' title='Fecha de Inicio'/>
                <MyDatePicker name='fechaTermino' title='Fecha de Termino'/>
              </div>
              {isLoading
                ? <p>Cargando...</p>
                : (
                  <Field name='requerimentos'
                    component={CustomSelect}
                    options={data}
                    isMulti
                    isCreatable
                    placeholder='Requerimientos'
                  />
                  )}
                <Field name="descripcion">
                {({ field }: FieldProps) => <ReactQuill placeholder='Los 2 primeros renglones son los que se muestran en la ventana anterior. ¡Hazlos llamativos!' value={field.value} onChange={field.onChange(field.name)} className='h-36 mb-4'/>}
              </Field>
                <FieldArray name="links">
                {({ push, remove }) => (
                  <div className='flex flex-col justify-start mt-12 sm:mt-2 '>
                      <span className='italic font-semibold mt-3'>¡Agrega links a formularios o documentos!</span>
                      <div className='flex max-w-80 overflow-x-scroll custom-scrollbar snap-mandatory'>
                          {values.links.map((link, index) => (
                            <div key={index} className=" flex w-1/2 shrink-0 items-center py-2 px-2 gap-2">
                              <MyTextInput label={ `Link: ${index + 1}`} name={`links.${index}`} type="text" className='input-procedure grow'/>
                              <button type="button" onClick={() => remove(index)}>
                              <DeleteProcedure styles='w-6 h-6 fill-none stroke-2 stroke-accent_100 mt-5' />
                              </button>
                            </div>
                          ))}
                      </div>
                    <button
                      type="button"
                      onClick={() => { push('') }}
                      disabled={isSubmitting}
                      className="mt-4 border-2 rounded-lg px-1 py-1 border-accent_200  w-fit  bg-primary_op_100/30"
                    >
                      <AddProcedure styles='w-6 h-6 fill-none stroke-2 stroke-accent_100' />
                    </button>
                  </div>
                )}
              </FieldArray>

            <button className='mt-8 white-border w-fit self-center' type='submit'>Confirmar</button>
            </Form>
          ) }
        </Formik>
      </div>
    </div>
  )
}
