import { teacherQueryKeys } from '@/api/teachers/teachers-query-keys'
import { RemoveIcon } from '@/components/icons/Icons'
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
}
export function ProfesorCard ({ nombre, email, area, id = '/', detail, edit = false }: ProfesorCardProps) {
  const appDispatch = useAppDispatch()
  const { rol } = useAppSelector((state) => state.auth)
  const handleTriggerModal = () => {
    appDispatch(openDeleteModal())
    appDispatch(setInfoModal({ id, nombre }))
  }
  const deleteTeacher = useMutationState({
    filters: { mutationKey: teacherQueryKeys.delete(id) },
    select: (mutation) => mutation.state.status === 'success' ? 'success' : 'error'
  })

  const canDelete = (!detail && rol === LEVEL_ACCESS.ADMIN && edit)
  return (
    <article className={`relative h-full mt-8 ${deleteTeacher[0] === 'success' ? 'bg-red-500 hidden' : ''}`}>
          {(canDelete) && (
                      <button onClick={() => { handleTriggerModal() }} className='w-10 h-10 bg-primary_op_100/90 border-2 border-accent_100 shadow-xl rounded-full font-bold absolute -top-2 -left-4 text-center tilt z-50 flex justify-center items-center'>
                      <RemoveIcon styles='w-8 h-8 stroke-bg_200 fill-bg_300 stroke-primary_200 drop-shadow-lg' />
                    </button >
          )}
      <article className={'bg-bg_300 rounded-lg border-4 border-text_100 px-4 py-4 relative white-border grid h-min overflow-hidden hover:scale-105 profesor__card '}>
        <img
          className={'rounded-full border-4 border-primary_300 \'w-16 h-16'}
          src={'https://via.placeholder.com/150'}
          alt={nombre}
        />
        <div className={'flex flex-col leading-8 justify-around'}>
          <article>
            <Link to={id} ><h2 className='text-xl sm:text-2xl text-text_100 hover:text-primary_300 font-bold '>
              {nombre}</h2>  </Link>
          <p className='text-base text-wrap font-bold text-peimary_300 '>Areá: <span className='text-accent_100'>{area}</span> </p>
          <p className='text-base text-wrap font-bold text-peimary_300 '>Email: <span className='text-accent_100'>{email}</span> </p>
          </article>
        </div>
      </article>
    </article>
  )
}
