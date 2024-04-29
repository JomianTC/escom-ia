import { useTags } from '@/api/tags/use-get-tags'
import { useUpdateTag } from '@/api/tags/use-update-tag'
import { ReturnButton } from '@/components/ReturnButton'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { openDeleteModal, setInfoModal } from '@/store/slices/uiSlice'
import { useFormik } from 'formik'

export const EditarTags = () => {
  const updateTag = useUpdateTag()
  const formik = useFormik({
    initialValues: {
      value: '',
      label: '',
      nombre: ''
    },
    onSubmit: async (values) => {
      console.log(values)
      await updateTag.mutateAsync({
        nombre: values.nombre,
        id: values.value
      }).then((res) => {
        console.log(res)
      }).finally(() => {
        formik.resetForm()
      })
    }
  })
  const handleSelect = async (value: string, id: string) => {
    console.log(value, id)

    await formik.setFieldValue('value', value)
    await formik.setFieldValue('label', id)
  }
  const tags = useTags()
  console.log(tags.data)

  const dispatch = useAppDispatch()

  return (
      <div className='grow flex flex-col gap-6 mt-0 overflow-hidden'>
              <header className='w-full flex'>
            <h3 className='text-lg grow font-semibold  text-primary_200 bg-primary_op_100/20 px-4 py-1 '>Selecciona un Tag para actualizar</h3>
            <ReturnButton styles='w-10 h-10 sm:w-8 sm:h-8 ' />
          </header>
              <form onSubmit={formik.handleSubmit} className="flex flex-col sm:flex-row gap-2 w-fit items-center">
          <div>
            <label htmlFor="label" className='font-semibold '>Tag seleccionado:</label>
            <input
              type="text"
              id="label"
              name="label"
              placeholder='Selecciona algún tag arriba'
              onChange={formik.handleChange}
              value={formik.values.label}
              disabled
              className="bg-bg_300 p-2 rounded-lg border-2 border-primary_200 "
            />
          </div>
          <div>
            <label htmlFor="nombre">Actualiza el Tag</label>
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
            className="bg-bg_300 p-2 rounded-lg border-2 border-primary_200"
          />
          <button type="submit" className="px-4 py-1 mt-6 border-2 border-primary_200 font-semibold h-fit self-center rounded-lg shadow-lg shadow-primary_100 ">Actualizar</button>
        </form>
        <div className='grow flex gap-2 flex-wrap justify-start items-start content-start h-full  overflow-y-scroll custom-scrollbar'>
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
        </div>
  )
}
