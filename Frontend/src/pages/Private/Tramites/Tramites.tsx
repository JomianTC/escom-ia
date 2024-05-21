import { useProcedures } from '@/api/procedures/use-get-procedures'
import { ActionButton } from '@/components/ActionButton'
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
  const { rol } = useAppSelector((state) => state.auth)
  const canCreateAndEdit = rol === LEVEL_ACCESS.ADMIN
  // const isStudent = rol === LEVEL_ACCESS.STUDENT
  const dispatch = useDispatch()
  // const notifications = useSubscribe()
  const handleDetails = (procedure: Procedure, requerimientos: string[]) => {
    dispatch(setProcedure({ ...procedure, requerimientos }))
    // dispatch(showModal())
  }
  const navigate = useNavigate()
  const { data, isLoading } = useProcedures()
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
    <section className='profesores__grid container p-8 w-full h-full my-0 mx-auto grid sm:gap-6 relative z-40 overflow-y-scroll custom-scrollbar auto-rows-min gap-8'>
      <div className="controls col-span-full h-fit flex flex-wrap justify-center  sm:items-center flex-col sm:flex-row ">
        <h1 className='grid__title grow w-full'>Trámites</h1>
        <div className='flex items-center gap-6 flex-wrap grow'>
          <input type="text" placeholder='Tramite' value={search} onChange={(e) => { setSearch(e.target.value) }} className='text-text_accent my-6 py-1 px-4 w-full max-w-lg ' />
        </div>

        {/* Creation controls */}
        {canCreateAndEdit && (
          <NavLink to='crear' className='flex items-center justify-center w-fit h-fit py-2 px-3 text-white bg-primary_300 rounded-lg hover:bg-primary_200 transition-colors'>Crear Trámite</NavLink>
        )}
        {/* </article> */}
      </div>
      {filteredData.length > 0
        ? filteredData.map(({ tramite, requerimientos }: ProcedureContent) => {
          const isAvailable = tramite.estado
          return (
              <div key={tramite.id} className={`p-2  self-start  white-border rounded-xl flex-col justify-between my-2 grid tramite__subgrid h-full ${isAvailable ? 'bg-bg_300' : 'bg-accent_100 select-none opacity-80'}`}>
                {isAvailable
                  ? <NavLink to={`detalles/${tramite.id}`} className='text-center text-xl font-bold mb-2' onClick={() => { handleDetails(tramite, requerimientos) }}>{tramite.nombre}</NavLink>
                  : <h1 className='text-center text-xl font-bold mb-2' >{tramite.nombre}</h1>
                }
                <p className='text-nowrap overflow-hidden text-ellipsis' dangerouslySetInnerHTML={createMarkup(tramite.descripcion.substring(0, 140))}></p>
                <div className='flex justify-between py-4 items-center'>
                  {
                    isAvailable
                      ? <ActionButton callback={() => {
                        handleDetails(tramite, requerimientos)
                        handleRedirect(tramite.id)
                      }} text='Detalles' extraStyles='border-2 px-4 py-1 rounded-lg font-bold h-fit' disabled={!isAvailable} />
                      : <ActionButton callback={() => { handleDetails(tramite, requerimientos) } } text='Detalles' extraStyles='border-2 px-4 py-1 rounded-lg font-bold h-fit' disabled={!isAvailable} />
                  }
                  {canCreateAndEdit && (<>
                    <NavLink to={`editar/${tramite.id}`} onClick={() => { handleDetails(tramite, requerimientos) }} className='flex items-center justify-center w-fit h-fit py-2 px-3  text-white bg-primary_300 rounded-lg  ml-auto mr-2 hover:bg-bg_200 hover:text-text_100 transition-colors hover:font-bold '>Editar</NavLink>
                    <button onClick={() => {
                      dispatch(setInfoModal({ id: tramite.id, type: 'tramite', nombre: tramite.nombre, estado: tramite.estado }))
                      dispatch(openActivateModal())
                    }} className={`flex items-center justify-center w-fit h-fit py-2 px-3  text-white bg-primary_300 rounded-lg hover:bg-primary_400 transition-colors ${isAvailable ? 'hover:bg-red-500' : 'hover:bg-primary_200 text-bold'}`}>{
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
