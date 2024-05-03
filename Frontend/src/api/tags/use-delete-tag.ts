import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, tagsClient } from '../axios'
import { toast } from 'react-toastify'
import { tagQueryKeys } from './tags-query-keys'

async function deleteTag (id: string) {
  const token = JSON.parse(localStorage.getItem('token') ?? '{}')
  console.log(token)
  tagsClient.defaults.headers.common.Authorization = `Bearer ${token.value}`
  try {
    const response = await tagsClient.delete(API_URLS.tagClient.deleteTag + id)
    return response.data
  } catch (error) {
    throw new Error('Algo salio mal')
  }
}

export function useDeleteTag () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-tag'],
    mutationFn: deleteTag,
    onMutate: async (variables) => {
      toast.info('Eliminando tag')
      await queryClient.cancelQueries({
        queryKey: tagQueryKeys.all
      })
      await queryClient.invalidateQueries({
        queryKey: tagQueryKeys.all
      })
      await queryClient.invalidateQueries()
      console.log('onMutate', variables)
    },
    onError: (error) => {
      toast.error('Error al eliminar tag')
      console.error('onError', error)
    },
    onSettled: async (data, error, variables
    ) => {
      await queryClient.invalidateQueries({
        queryKey: tagQueryKeys.all
      })
      console.log('onSettled', data, error, variables)
    }

  })
}
