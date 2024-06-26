import { useDeleteComment } from '@/api/comments/use-delete-comment'
import { ModalLayout } from '@/pages/layouts/ModalLayout'
import { useAppDispatch, useAppSelector } from '@/store/hooks/useAppSelector'
import { closeDeleteCommentModal } from '@/store/slices/uiSlice'

export function DeleteCommentModal () {
  const { isDeleteCoomentModalOpen, infoModal } = useAppSelector(state => state.ui)
  const deleteComment = useDeleteComment()
  const dispatch = useAppDispatch()

  const handleConfirm = async () => {
    await deleteComment.mutateAsync(infoModal.id).then((_res) => {
      dispatch(closeDeleteCommentModal())
    })
  }

  return (
    <>
      {isDeleteCoomentModalOpen && (
        <ModalLayout>
          <>
            <h2 className='font-semibold text text-2xl md:text-2xl  '>¿Eliminar comentario?</h2>
            <div >
              <div className='flex gap-4 justify-end mt-8'>
                <button onClick={async () => { dispatch(closeDeleteCommentModal()) }} className='bg-accent_100 text-bg_300 p-2 rounded-lg px-3'>Cancelar</button>
                <button onClick={async () => { await handleConfirm() }} className='bg-accent_200 text-bg_300 p-2 rounded-lg px-3'>Confirmar</button>
              </div>
            </div>
          </>
        </ModalLayout>
      )}
    </>
  )
}
