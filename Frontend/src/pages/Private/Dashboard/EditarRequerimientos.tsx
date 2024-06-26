import { useGetRequirments } from '@/api/requirments/use-get-requirmets'
import { useUpdateRequirment } from '@/api/requirments/use-update-requirment'
import { ApiLoader } from '@/components/ApiLoader'
import { AdminDashboardLayout } from '@/pages/layouts/AdminDashboardLayout'
import { useFormik } from 'formik'
import { type ReactNode } from 'react'
import Element from './components/Element'
type RequirmentType = {
  value: string
  label: string
}
export function EditarRequerimientos ({ children }: { children?: ReactNode }) {
  const { data: requirments } = useGetRequirments()
  const updateRequirment = useUpdateRequirment()
  const formik = useFormik({
    initialValues: {
      value: '',
      label: '',
      nombre: ''
    },
    onSubmit: async (values) => {
      await updateRequirment.mutateAsync({
        nombre: values.nombre,
        id: values.value
      }).then((_res) => {
        formik.resetForm()
      })
    }
  })
  async function handleSelect (value: string, id: string) {
    await formik.setFieldValue('value', value)
    await formik.setFieldValue('label', id)
  }
  return (
      <AdminDashboardLayout title='Editar Requerimientos'>
        <form onSubmit={formik.handleSubmit} className="flex flex-col sm:flex-row gap-2  sm:items-end w-full">
        <div className='flex flex-col'>
          <label htmlFor="label" className='font-semibold '>Requisito seleccionado:</label>
          {(formik.errors.label != null && (formik.touched.nombre === true)) && <p className='text-red-600 font font-semibold inline-block '> {formik.errors.label} </p>
          }
          <input
            type="text"
            id="label"
            name="label"
            placeholder='Selecciona algún requisito'
            onChange={formik.handleChange}
            value={formik.values.label}
            disabled
            className="bg-bg_300 p-2 rounded-lg border-2 border-primary_200 max-w-72 "
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="nombre" className='font-semibold '>Actualiza el Requisito</label>
          {(formik.errors.nombre != null && (formik.touched.nombre === true)) && <p className='text-red-600 font font-semibold inline-block '> {formik.errors.nombre} </p>
          }
          <input
            type="text"
            id="nombre"
            name="nombre"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            placeholder='Boleta global'
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
        <button type="submit" className="px-4 py-1 mt-6 border-2 border-primary_200 font-semibold h-fit sm:self-center rounded-lg shadow-lg shadow-primary_100 disabled:opacity-60" disabled={ updateRequirment.isPending}>
        {(updateRequirment.isPending)
          ? <ApiLoader/>
          : 'Actualizar'
         }
        </button>

      </form>
      {/* Formulario de creación */}
      {children}
      <div className='grow flex gap-2 flex-wrap justify-start items-start content-start h-full  overflow-y-scroll hide-scrollbar max-h-80'>
        {requirments?.map((requirment: RequirmentType) => (
                <Element key={requirment.value} value={requirment.value} label={requirment.label} type='requirement' handleSelect={handleSelect} />
        ))}
      </div>
          </AdminDashboardLayout>
  )
}
