import { useTags } from '@/api/tags/use-get-tags'
import { useUpdateTag } from '@/api/tags/use-update-tag'
import { ApiLoader } from '@/components/ApiLoader'
import { ReturnButton } from '@/components/ReturnButton'
import { updateSchema } from '@/pages/Schemas'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { openDeleteModal, setInfoModal } from '@/store/slices/uiSlice'
import { useFormik } from 'formik'
import { type ReactNode, useEffect } from 'react'

export const EditarTags = ({ children }: { children: ReactNode }) => {
  const updateTag = useUpdateTag()
  const formik = useFormik({
    initialValues: {
      value: '',
      label: '',
      nombre: ''
    },
    onSubmit: async (values) => {
      await updateTag.mutateAsync({
        nombre: values.nombre,
        id: values.value
      }).then((_res) => {

      }).finally(() => {
        formik.resetForm()
      })
    },
    validationSchema: updateSchema
  })

  const handleSelect = async (value: string, id: string) => {
    await formik.setFieldValue('value', value)
    await formik.setFieldValue('label', id)
  }

  const tags = useTags()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (formik.errors.value != null && formik.touched.nombre === true) {
      const timeOut = setTimeout(() => {
        formik.resetForm({
          errors: {}
        })
      }, 3000)
      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [formik.errors.label])

  return (
    <section className='grow flex flex-col gap-6 mt-0'>
      <header className='w-full flex'>
        <h3 className='text-lg grow font-semibold  text-primary_200 bg-primary_op_100/20 px-4 py-1 '>Selecciona un Tag para actualizar</h3>
        <ReturnButton styles='w-8 h-8 sm:w-8 sm:h-8 ' />
      </header>
      <form onSubmit={formik.handleSubmit} className="flex flex-col sm:flex-row gap-2  sm:items-end w-full">
        <div className='flex flex-col'>
          <label htmlFor="label" className='font-semibold '>Tag seleccionado:</label>
          {(formik.errors.label != null && (formik.touched.nombre === true)) && <p className='text-red-600 font font-semibold inline-block '> {formik.errors.label} </p>
          }
          <input
            type="text"
            id="label"
            name="label"
            placeholder='Selecciona algún tag'
            onChange={formik.handleChange}
            value={formik.values.label}
            disabled
            className="bg-bg_300 p-2 rounded-lg border-2 border-primary_200 max-w-72 "
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nombre" className='font-semibold '>Actualiza el Tag</label>
          {(formik.errors.nombre != null && (formik.touched.nombre === true)) && <p className='text-red-600 font font-semibold inline-block '> {formik.errors.nombre} </p>
          }
          <input
            type="text"
            id="nombre"
            name="nombre"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            className="bg-bg_300 p-2 rounded-lg border-2 border-primary_200"
          />
        </div>
        <input
          type="hidden"
          id="value"
          name="value"
          onChange={formik.handleChange}
          value={formik.values.value}
          className="bg-bg_300 py-1 rounded-lg border-2 border-primary_200"
        />
        <button type="submit" className="px-4 py-1 mt-6 border-2 border-primary_200 font-semibold h-fit sm:self-center rounded-lg shadow-lg shadow-primary_100 disabled:opacity-60" disabled={ updateTag.isPending}>
        {(updateTag.isPending)
          ? <ApiLoader/>
          : 'Actualizar'
         }
        </button>

      </form>
      {/* Formulario de creación */}
      {children }
      <div className='grow flex gap-2 flex-wrap justify-start items-start content-start h-full  overflow-y-scroll custom-scrollbar max-h-80'>
        {tags.data?.map((tag) => (
          <div key={tag.value} className='tag px-3 flex gap-2 py-1 rounded-lg sm:text-lg '>
            <button onClick={async () => { await handleSelect(tag.value, tag.label) }} >{tag.label}</button>
            <button className='hover:text-primary_100 font-bold px-4'
              onClick={() => {
                dispatch(openDeleteModal())
                dispatch(setInfoModal({ id: tag.value, nombre: tag.label, type: 'tag' }))
              }}
            >x</button>
          </div>
        ))}
      </div>
    </section>
  )
}
