import { useCreateTag } from '@/api/tags/use-create-tag'
import { ApiLoader } from '@/components/ApiLoader'
import { tagCreateSchemaAndEdit } from '@/pages/Schemas'
import { useFormik } from 'formik'
import { useEffect } from 'react'

export function CreateTagComponent () {
  const createTag = useCreateTag()

  const createFormik = useFormik({
    initialValues: {
      tag: ''
    },
    onSubmit: async (values) => {
      if (values.tag.trim() === '') {
        return
      }
      await createTag.mutateAsync({
        nombre: values.tag.trim()
      }).then(async (_res) => {
        createFormik.resetForm()
        await createFormik.setFieldValue('tag', '')
      }).catch((err) => {
        console.error(err)
      }).finally(() => {
        createFormik.resetForm()
      })
    },
    validationSchema: tagCreateSchemaAndEdit
  })
  useEffect(() => {
    if (createFormik.errors.tag != null && createFormik.touched.tag === true) {
      const timeOut = setTimeout(() => {
        createFormik.resetForm({
          errors: {}
        })
      }, 3000)
      return () => {
        clearTimeout(timeOut)
        createFormik.resetForm()
      }
    }
  }, [createFormik.values.tag, createTag.isSuccess, createTag.isError, createTag.isIdle])
  return (
    <form onSubmit={createFormik.handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:items-center flex-wrap w-full -mt-4">
    <div className='flex flex-col'>
      <label htmlFor="tag" className='font-semibold '>Crea un nuevo Tag</label>
      {(createFormik.errors.tag != null && (createFormik.touched.tag === true)) && <p className='text-red-600 font-semibold inline-block '> {createFormik.errors.tag} </p>
      }
      <input
        type="text"
        placeholder='Demasiada tarea'
        id="tag"
        name="tag"
        onChange={createFormik.handleChange}
        value={createFormik.values.tag}
        className="bg-bg_300 py-1 rounded-lg border-2 border-primary_200 max-w-96"
      />
    </div>
    <button type="submit" className="px-4 py-1 mt-6 border-2 border-primary_200 font-semibold h-fit sm:self-end rounded-lg shadow-lg shadow-primary_100 disabled:opacity-65 flex justify-center items-center " disabled={createTag.isPending }>
      {(createTag.isPending)
        ? <ApiLoader/>
        : 'Agregar'
     }
    </button>
  </form>
  )
}
