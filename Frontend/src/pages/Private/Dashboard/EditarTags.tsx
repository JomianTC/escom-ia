import { useUpdateTag } from '@/api/tags/use-update-tag'
import { ApiLoader } from '@/components/ApiLoader'
import { ReturnButton } from '@/components/ReturnButton'
import { updateSchema } from '@/pages/Schemas'
import { useFormik } from 'formik'
import { type ReactNode, type RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Tags from './components/Tags'

export const EditarTags = ({ children }: { children: ReactNode }) => {
  const topPage = useRef<HTMLDivElement>(null)
  const inputEditTag = useRef<HTMLInputElement>(null)
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

  const { element } = useOutletContext<{ element: RefObject<HTMLDivElement> }>()

  const [isEdit, setIsEdit] = useState(false)
  const handleSelect = useCallback(async (value: string, id: string) => {
    await formik.setFieldValue('value', value)
    await formik.setFieldValue('label', id)
    element.current?.scroll({ top: 0, behavior: 'smooth' })
    inputEditTag.current?.focus()
  }, [])

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
    <section className='grow flex flex-col gap-6 mt-0' ref={topPage}>
      <header className='w-full flex'>
        <h3 className='text-lg grow font-semibold  text-primary_200 bg-primary_op_100/20 px-4 py-1 '>Selecciona una Acción</h3>
        <ReturnButton styles='w-8 h-8 sm:w-8 sm:h-8 ' />
      </header>
      <div>
        <button onClick={() => { setIsEdit(!isEdit) }} className='bg-primary_200 text-bg_200 font-semibold px-4 py-1 rounded-lg shadow-lg hover:bg-primary_100 hover:text-bg_200 transition-all -mt-8'>{!isEdit ? 'Editar Tags' : 'Crear Tag' }</button>
      </div>
      {
        isEdit
          ? (
          <form onSubmit={formik.handleSubmit} className="flex flex-col sm:flex-row gap-2  sm:items-end w-full -mt-4">
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
                  ref = {inputEditTag}
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
            )
          : (
            <>
            {children}
            </>
            )
      }
      <Tags handleSelect={ handleSelect} />
    </section>
  )
}
