import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, requirmentClient } from '../axios'
import { toast } from 'react-toastify'
import { requirmentsQueryKeys } from './requirments-query-keys'

async function deleteRequirement (id: string) {
  const token = JSON.parse(localStorage.getItem('token') ?? '{}')
  requirmentClient.defaults.headers.common.Authorization = `Bearer ${token.value}`
  try {
    const response = await requirmentClient.delete(API_URLS.requirmentClient.deleteRequirment + id)
    return response.data
  } catch (error) {
    throw new Error('Algo salio mal')
  }
}

export function useDeleteRequirment () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteRequirement,
    onError: (error) => {
      toast.error('Oops estamos revisando que sucedio, intenta de nuevo más tarde')
      console.error(error)
    },
    onSuccess: async (_data) => {
      toast.success('Requisito eliminado')
      await queryClient.invalidateQueries({
        queryKey: requirmentsQueryKeys.all
      })
    }
  })
}
