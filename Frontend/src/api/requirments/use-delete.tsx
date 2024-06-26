import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, requirmentClient } from '../axios'
import { requirmentsQueryKeys } from './requirments-query-keys'

async function deleteRequirement (id: string) {
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
