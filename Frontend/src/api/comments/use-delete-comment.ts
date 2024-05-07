import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, commentsClient } from '../axios'
import { commentsQueryKeys } from './comments-query-keys'
async function deleteComment (id: string) {
  try {
    const response = await commentsClient.delete(API_URLS.commentsClient.deleteComment + id)
    console.log(response)
  } catch (error) {

  }
}

export function useDeleteComment () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteComment,
    onMutate: async (variables) => {
      toast.info('Eliminando Comentario')
      await queryClient.cancelQueries({
        queryKey: commentsQueryKeys.allByUser
      })
      await queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.allByUser
      })
      await queryClient.invalidateQueries()
      console.log('onMutate', variables)
    },
    onError: (error) => {
      toast.error('Error al eliminar tag')
      console.error('onError', error)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.allByUser
      })
    }
  }
  )
}
