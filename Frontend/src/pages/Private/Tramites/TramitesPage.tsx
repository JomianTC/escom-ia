import { useAppSelector } from '@/store/hooks/useAppSelector'
import { setProcedure, showModal } from '@/store/slices/procedureModalSlice'
import { useDispatch } from 'react-redux'
import { ModalTramite } from './components/ModalTramite'
const respose = {
  procedures: [
    {
      id: '8779b211-fbcb-466c-892f-4df581f680a5',
      nombre: 'kame hame haaaaaaaaaaaaa',
      descripcion: 'Cambio en el nombre del tramite',
      fechaInicio: '2024-02-02T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    },
    {
      id: '99c32be0-fc7e-465a-9023-d1adf0238674',
      nombre: 'trabajo opcional',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-01T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    },
    {
      id: '47b48c15-25ee-4782-a675-f6dae62e3ee1',
      nombre: 'trabajo opcional 2',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-01T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    },
    {
      id: '23ef0a20-2872-4c25-970e-ff822d7c9b41',
      nombre: 'trabajo opcional 3',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-01T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    },
    {
      id: 'c4a1f727-04c7-47d2-b094-3f8221942588',
      nombre: 'trabajo opcional 4',
      descripcion: 'Este tramite te ayudara tramitar el servicio social',
      fechaInicio: '2024-02-01T06:00:00.000Z',
      fechaTermino: '2024-03-22T06:00:00.000Z',
      estado: true,
      esInformativo: true
    }
  ],
  total: 5
}
export function TramitesPage () {
  const { isModalOpen } = useAppSelector((state) => state.procedure)
  const dispatch = useDispatch()
  const handleDetails = (procedure) => {
    dispatch(setProcedure(procedure))
    dispatch(showModal())
  }
  return (
    <section className='container gap-8 sm:gap-8 grid grid-cols-2 sm:grid-cols-3 justify-items-center p-4 mx-auto'>
    <div className="controls col-span-full">
      <h1 className='grid__title'>Trámites</h1>
      <div className='flex flex-col items-end gap-2'>
        {/* <span>Mostrando página: {page} de { totalPages }</span> */}
        <div className="flex">
          {/* <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700  disabled:opacity-40' onClick={() => { handlePageChange(page - 1) }} disabled={page === 1}>Anterior</button> */}
          {/* <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 ' onClick={() => { handlePageChange(page + 1) }} disabled={page === totalPages }>Siguiente</button> */}
        </div>
      </div>
    </div>
    {respose?.procedures?.map((procedure) => (
      <div key={procedure.id} className='bg-bg_100 w-full p-2 white-border rounded-xl flex flex-col justify-between'>
        <h3 className='text-center text-xl font-bold mb-2'>{procedure.nombre}</h3>
        <p>{procedure.descripcion}</p>
        <button onClick={() => { handleDetails(procedure) }}>Detalles</button>
      </div>
    ))}
    { isModalOpen && <ModalTramite />}
  </section>
  )
}
