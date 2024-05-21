import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, tagsClient } from '../axios'
import { tagQueryKeys } from './tags-query-keys'

async function deleteTag (id: string) {
  try {
    const response = await tagsClient.delete(API_URLS.tagClient.deleteTag + id)
    return response.data
  } catch (error: any) {
    if (error.response.status === 500) {
      throw new Error('El tag esta en uso')
    }
    throw new Error('Algo salio mal')
  }
}

export function useDeleteTag () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-tag'],
    mutationFn: deleteTag,
    onMutate: async () => {
      toast.info('Eliminando tag')
      await queryClient.cancelQueries({
        queryKey: tagQueryKeys.all
      })
      await queryClient.invalidateQueries({
        queryKey: tagQueryKeys.all
      })
      await queryClient.invalidateQueries()
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async (_data, _error, _variables) => {
      await queryClient.invalidateQueries({
        queryKey: tagQueryKeys.all
      })
    },
    onSuccess: () => {
      toast.success('Tag eliminado')
    }
  })
}
