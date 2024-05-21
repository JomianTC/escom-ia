import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { requirmentClient } from '../axios'
import { API_URLS } from './../axios'
import { requirmentsQueryKeys } from './requirments-query-keys'

const updateRequirement = async (newRequirement: { nombre: string, id: string }) => {
  try {
    const { nombre } = newRequirement
    const response = await requirmentClient.put(API_URLS.requirmentClient.updateRequirments + newRequirement.id, { nombre })
    return response.data
  } catch (error) {
    throw new Error('Oops esto es por nosotros no por ti, intenta de nuevo más tarde')
  }
}

export function useUpdateRequirment () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateRequirement,
    onMutate: async (newTag) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when rolling back
      return newTag
    },
    onError: (error, _newTag, context) => {
      console.error(error)
      // An error happened!
      toast.error('Error al actualizar el dato')
      // Use the context to roll back the mutation
      return context
    },
    onSuccess: async (_data, _variables, _context) => {
      await queryClient.invalidateQueries({ queryKey: requirmentsQueryKeys.all })
      toast.success('Requisito actualizado')
      // The mutation was successful!
      // Use the context to do something with the data
    },
    onSettled: (_data, _error, _variables, _context) => {
      // The mutation is done!
      // Use the context to do something after the mutation is done
    }
  })
}
