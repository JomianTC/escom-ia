import { useCreateTeacher } from '@/api/teachers/use-create-teacher'
import { useEditTeacher } from '@/api/teachers/use-edit-teacher'
import { MyTextInput } from '@/components/InputText'
import { AREAS, GRADOS_ACADEMICOS, profesorEsquema } from '@/pages/Schemas'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { closeCreateTeacherModal } from '@/store/slices/uiSlice'
import { type TeacherFormData } from '@/types/index'
import { Field, Form, Formik } from 'formik'

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
  const dispatch = useAppDispatch()
  const isUpdating = action === 'update'
  const handleCreateTeacher = async (values: TeacherFormData & { sexo: 'masculino' | 'femenino', id: string, foto_perfil: string, calificacion: number }) => {
    if (isUpdating) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await teacherUpdate.mutateAsync(values).then(() => {
        dispatch(closeCreateTeacherModal())
      })
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await teacher.mutateAsync(values).then(() => {
      dispatch(closeCreateTeacherModal())
    })
  }

  return (
      <Formik
        initialValues={initialValues}
        onSubmit={async function (values, actions) {
          await handleCreateTeacher({ sexo: 'masculino', foto_perfil: '', calificacion: 10, id: '', ...values })
          // Reinitialize the form
          actions.resetForm()
        }}
        validationSchema={profesorEsquema}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className={`mt-0 w-full px-4 flex flex-col gap-4 ${isUpdating ? 'h-full' : 'max-h-96'}  overflow-y-scroll ${styles}`}>
            {teacherUpdate.isPending && <p>Actualizando...</p>}
                  {teacher.isPending && <p>Actualizando...</p>}
                  { !isUpdating && <h1>Agrega un profesor</h1> }
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
