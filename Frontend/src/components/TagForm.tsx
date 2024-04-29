import { Form, Formik } from 'formik'
import { MyTextInput } from './InputText'
import { tagCreateShecma } from '@/pages/Schemas'
import { useCreateTag } from '@/api/tags/use-create-tag'

export default function TagForm ({ children }: { children: React.ReactNode }) {
  const createTag = useCreateTag()
  const handleTagCreation = async (values: { nombre: string }) => {
    const tagCreation = {
      nombre: values.nombre
    }
    await createTag.mutateAsync(tagCreation)
    // Mandar a llamar la función de creación de tag
  }
  return (
    <Formik
    initialValues={{
      nombre: ''
    }}
    onSubmit={async (values, actions) => {
      actions.resetForm()
      actions.setSubmitting(false)
      await handleTagCreation(values)
      //   setShowForm(false)
    }}
    validationSchema={tagCreateShecma}
>
    {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-4 h-full  '>
            <MyTextInput label="Tag" name="nombre" type="text" placeholder="Agrega un nuevo tag..." className='mt-4'/>
            <button type='submit' className='px-4 py-1 border-4 border-accent_200 h-min self-center'>Crear</button>
                  {children }
        </Form>
    )}
    </Formik>
  )
}
