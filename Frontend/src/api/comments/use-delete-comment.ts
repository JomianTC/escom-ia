import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, commentsClient } from '../axios'
import { commentsQueryKeys } from './comments-query-keys'
async function deleteComment (id: string) {
  try {
    await commentsClient.delete(API_URLS.commentsClient.deleteComment + id)
  } catch (error) {
    console.error(error)
    throw new Error('No se pudo eliminar el comentario')
  }
}

export function useDeleteComment () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteComment,
    onMutate: async (_variables) => {
      toast.info('Eliminando Comentario')
      await queryClient.cancelQueries({
        queryKey: commentsQueryKeys.allByUser
      })
      await queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.allByUser
      })
      await queryClient.invalidateQueries()
    },
    onError: (_error) => {
      toast.error('Error al eliminar tag')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.allByUser
      })
    }
  }
  )
}
