import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, requirmentClient } from '../axios'
import { toast } from 'react-toastify'
import { requirmentsQueryKeys } from './requirments-query-keys'

async function deleteRequirement (id: string) {
  const token = JSON.parse(localStorage.getItem('token') ?? '{}')
  console.log(token)
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
    onMutate: async (variables) => {
      console.log('onMutate', variables)
    },
    onSettled: (data, error, variables) => {
      console.log('onSettled', data, error, variables)
    },
    onSuccess: async (data) => {
      toast.success('Requisito eliminado')
      await queryClient.invalidateQueries({
        queryKey: requirmentsQueryKeys.all
      })
      console.log('onSuccess', data)
    }
  })
}
