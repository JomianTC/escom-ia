import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { tagsClient } from '../axios'
import { API_URLS } from './../axios'
import { tagQueryKeys } from './tags-query-keys'

const updateTag = async (newTag: { nombre: string, id: string }) => {
  try {
    const { nombre } = newTag
    const response = await tagsClient.put(API_URLS.tagClient.updateTags + newTag.id, { nombre })
    return response.data
  } catch (error) {
    throw new Error('Oops esto es por nosotros no por ti, intenta de nuevo más tarde')
  }
}

export function useUpdateTag () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTag,
    onMutate: async (newTag) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when rolling back
      return newTag
    },
    onError: (error, _newTag, context) => {
      console.error(error)
      // An error happened!
      toast.error('Error al actualizar el tag')
      // Use the context to roll back the mutation
      return context
    },
    onSuccess: async (_data, _variables, _context) => {
      await queryClient.invalidateQueries({ queryKey: tagQueryKeys.all })
      toast.success('Tag actualizado')
      // The mutation was successful!
      // Use the context to do something with the data
    },
    onSettled: (_data, _error, _variables, _context) => {
      // The mutation is done!
      // Use the context to do something after the mutation is done
    }
  })
}
