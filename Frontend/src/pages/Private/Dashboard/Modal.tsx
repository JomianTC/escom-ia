import { useDeleteRequirment } from '@/api/requirments/use-delete'
import { useDeleteTag } from '@/api/tags/use-delete-tag'
import { useDeleteTeacher } from '@/api/teachers/use-delete-teacher'
import { ApiLoader } from '@/components/ApiLoader'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { closeDeleteModal } from '@/store/slices/uiSlice'

export function DeleteProfesorModal () {
  const { isDeleteModalOpen, infoModal } = useAppSelector((state) => state.ui)
  const removeTeacher = useDeleteTeacher()
  const removeTag = useDeleteTag()
  const removeRequirment = useDeleteRequirment()
  const handleRemoveTeacher = async () => {
    await removeTeacher.mutateAsync({ id: infoModal.id })
    dispatch(closeDeleteModal())
  }
  const handleRemoveTag = async () => {
    await removeTag.mutateAsync(infoModal.id)
    dispatch(closeDeleteModal())
  }
  const handleRemoveRequirment = async () => {
    await removeRequirment.mutateAsync(infoModal.id)
    dispatch(closeDeleteModal())
  }
  const handleDeleteAction = async () => {
    if (infoModal.type === 'profesor') {
      await handleRemoveTeacher()
    }
    if (infoModal.type === 'tag') {
      await handleRemoveTag()
    }
    if (infoModal.type === 'requirement') {
      await handleRemoveRequirment()
    }
  }
  const isLoading = removeTeacher.isPending || removeTag.isPending || removeRequirment.isPending
  // const isLoading = true
  const mainText = infoModal.type === 'profesor' ? 'al Profesor' : infoModal.type === 'tag' ? 'el Tag' : 'el Requisito'
  const dispatch = useAppDispatch()
  return (
    <>
      {isDeleteModalOpen && (
        <div className='fixed w-full h-screen top-0 left-0 flex justify-center items-center bg-zinc-400/80  z-[9000] p-8'>
          <div className='bg-bg_300 p-4 rounded-lg text-text_100 flex flex-col gap-8'>
            <>
              <h2 className='font-semibold text text-2xl md:text-3xl  '>¿Seguro que quieres eliminar {mainText }?</h2>
              <div >
                <p className='text-base md:text-lg '>¿Estas seguro de eliminar a {infoModal?.nombre}?</p>
                <div className='flex gap-4 justify-end mt-8'>
                  <button onClick={async () => { await handleDeleteAction() }} className='bg-accent_200 text-bg_300 p-2 rounded-lg disabled:bg-slate-400' disabled={
                    isLoading
                  }>
                    {isLoading
                      ? <ApiLoader />
                      : 'Eliminar'}
              </button>
                  <button onClick={async () => { dispatch(closeDeleteModal()) }} className='bg-accent_100 text-bg_300 p-2 rounded-lg px-3 disabled:bg-slate-400' disabled={
                    isLoading
                  }>
                    Cancelar
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  )
}
