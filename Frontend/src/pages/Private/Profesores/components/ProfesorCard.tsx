import { teacherQueryKeys } from '@/api/teachers/teachers-query-keys'
import { RemoveIcon } from '@/components/icons/Icons'
import ImageLoader from '@/components/ImageLoader'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { openDeleteModal, setInfoModal } from '@/store/slices/uiSlice'
import { LEVEL_ACCESS } from '@/types/index'
import { useMutationState } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
interface ProfesorCardProps {
  nombre?: string
  email?: string
  area?: string
  id?: string
  detail: boolean
  totalComments?: number
  children?: React.ReactNode
  edit?: boolean
  foto_perfil?: string
}
export function ProfesorCard ({ nombre, email, area, id = '/', detail, foto_perfil: fotoPerfil }: ProfesorCardProps) {
  const appDispatch = useAppDispatch()
  const { isEditMode } = useAppSelector((state) => state.ui)
  const { rol } = useAppSelector((state) => state.auth)
  const handleTriggerModal = () => {
    appDispatch(openDeleteModal())
    appDispatch(setInfoModal({ id, nombre }))
    // appDispatch(setEditMode(false))
  }
  const deleteTeacher = useMutationState({
    filters: { mutationKey: teacherQueryKeys.delete(id) },
    select: (mutation) => mutation.state.status === 'success' ? 'success' : 'error'
  })

  const canDelete = (!detail && rol === LEVEL_ACCESS.ADMIN && isEditMode)
  return (
    <article className={`profesor__item relative h-full ${deleteTeacher[0] === 'success' ? 'bg-red-500 hidden' : ''}`}>
          {(canDelete) && (
                      <button onClick={() => { handleTriggerModal() }} className='w-10 h-10 bg-primary_op_100/90 border-2 border-accent_100 shadow-xl rounded-full font-bold absolute -top-2 -left-4 text-center tilt z-50 flex justify-center items-center'>
                      <RemoveIcon styles='w-8 h-8 stroke-bg_200 fill-bg_300 stroke-primary_200 drop-shadow-lg' />
                    </button >
          )}
      <article className={'bg-bg_300 rounded-lg border-4 border-text_100 px-4 py-4 relative white-border grid h-min overflow-hidden hover:shadow-lg profesor__card transition-all '}>
        <ImageLoader alt={`Avatar del profesor ${nombre}` } externalUrl={fotoPerfil ?? ''} extraStyles='rounded-full border-4 border-primary_200 shadow-2xl  w-16 h-16' smallCard/>
        <div className={'flex flex-col  justify-around'}>
          <article>
        <Link to={id} aria-label={`${nombre}`} ></Link>
          <h2 className='text-xl sm:text-2xl leading-none text-text_100 hover:text-primary_300 font-bold text-wrap'>
          {nombre}</h2>
          <p className='text-base text-wrap font-bold text-peimary_300 '>Areá: <span className='text-accent_100 text-sm text-wrap'>{area}</span> </p>
          <p className='text-base text-wrap font-bold text-peimary_300 '>Email: <span className='text-accent_100 text-sm text-wrap'>{email}</span> </p>
            </article>
        </div>
      </article>
    </article>
  )
}
