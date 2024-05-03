import { useProcedures } from '@/api/procedures/use-get-procedures'
import Loader from '@/components/Loader'
import { useSearch } from '@/pages/hooks/useSearch'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { setProcedure } from '@/store/slices/procedureModalSlice'
import { openActivateModal, setInfoModal } from '@/store/slices/uiSlice'
import { type Procedure, type ProcedureContent } from '@/types/api-responses'
import { LEVEL_ACCESS } from '@/types/index'
import { createMarkup } from '@/utilities/sanitize'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { ActivateModal } from './components/Modal'

export function Tramites () {
  console.log('Tramites')

  const { rol } = useAppSelector((state) => state.auth)
  const canCreateAndEdit = rol === LEVEL_ACCESS.ADMIN
  const dispatch = useDispatch()
  const handleDetails = (procedure: Procedure, requerimientos: string[]) => {
    dispatch(setProcedure({ ...procedure, requerimientos }))
    // dispatch(showModal())
  }
  const navigate = useNavigate()
  const { data, isLoading, handlePageChange, page, totalPages } = useProcedures()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { search, setSearch, filteredData } = useSearch({
    type: 'tramite',
    data: data ?? []
  })

  const handleRedirect = (id: string) => {
    navigate(`detalles/${id}`)
  }

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <section className='profesores__grid container p-8 w-full h-full my-0 mx-auto grid gap-2 sm:gap-6 relative z-40 overflow-y-scroll custom-scrollbar auto-rows-min'>
      <div className="controls col-span-full h-fit">
        <h1 className='grid__title'>Trámites</h1>
        <div className='flex items-center gap-6 flex-wrap'>
          <input type="text" placeholder='Tramite' value={search} onChange={(e) => { setSearch(e.target.value) }} className='text-text_accent my-6 py-1 px-4 w-full max-w-lg ' />
        </div>
        {/* <span>Mostrando página: {page} de { totalPages }</span> */}
        <article className="flex justify-between w-full flex-wrap">
          {/* Page change controls */}
          <div className='flex gap-4'>
            <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700  disabled:opacity-40' onClick={() => { handlePageChange(page - 1) }} disabled={page === 1} >Anterior</button>
            <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 ' onClick={() => { handlePageChange(page + 1) }} disabled={page === totalPages}>Siguiente</button>
          </div>
          {/* Creation controls */}
          {canCreateAndEdit && (
              <NavLink to='crear' className='flex items-center justify-center w-fit h-fit py-2 px-3 text-white bg-primary_300 rounded-lg hover:bg-primary_400'>Crear Trámite</NavLink>
          )}
        </article>
      </div>
      {filteredData.length > 0
        ? filteredData.map(({ tramite, requerimientos }: ProcedureContent) => {
          const isAvailable = tramite.estado
          return (
            <div key={tramite.id} className={`  p-2
          self-start  white-border rounded-xl flex flex-col justify-between my-2 ${isAvailable ? 'bg-bg_300' : 'bg-accent_100 select-none opacity-80'}`}>
            {isAvailable
              ? <NavLink to={`detalles/${tramite.id}`} className='text-center text-xl font-bold mb-2' onClick={() => { handleDetails(tramite, requerimientos) }}>{tramite.nombre}</NavLink>
              : <h1 className='text-center text-xl font-bold mb-2' >{tramite.nombre }</h1>
            }
            <p className='text-nowrap overflow-hidden text-ellipsis' dangerouslySetInnerHTML={createMarkup(tramite.descripcion.substring(0, 140))}></p>
            <div className='flex justify-between py-4'>
              {
                isAvailable
                  ? <button className='border-4 px-4 py-1 rounded-lg font-bold' disabled={!isAvailable} onClick={() => {
                    handleDetails(tramite, requerimientos)
                    handleRedirect(tramite.id)
                  }}>Detalles</button>
                  : <button className='border-4 px-4 py-1 rounded-lg font-bold' disabled={!isAvailable} onClick={() => {
                    handleDetails(tramite, requerimientos)
                  }}>Detalles</button>
              }
              {canCreateAndEdit && (<>
                <NavLink to={`editar/${tramite.id}`} onClick={() => { handleDetails(tramite, requerimientos) }} className='flex items-center justify-center w-fit h-fit py-2 px-3  text-white bg-primary_300 rounded-lg hover:bg-primary_400 ml-auto mr-2 '>Editar</NavLink>
                  <button onClick={() => {
                    dispatch(setInfoModal({ id: tramite.id, type: 'tramite', nombre: tramite.nombre, estado: tramite.estado }))
                    dispatch(openActivateModal())
                  }} className={`flex items-center justify-center w-fit h-fit py-2 px-3  text-white bg-primary_300 rounded-lg hover:bg-primary_400 ${isAvailable ? 'hover:bg-red-500' : 'hover:bg-primary_200 text-bold'}`}>{
                    isAvailable ? 'Desactivar' : 'Activar'
                  }</button>
              </>)}
            </div>
          </div>
          )
        })
        : <div className='flex items-center justify-center w-full h-24 text-lg text-gray-500'>No se encontraron trámites</div>
      }
    <ActivateModal />
    </section>
  )
}
