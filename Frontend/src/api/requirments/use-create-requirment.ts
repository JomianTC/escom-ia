import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, requirmentClient } from '../axios'
import { requirmentsQueryKeys } from './requirments-query-keys'
import { toast } from 'react-toastify'

async function createRequirment (requirment: string) {
  try {
    const response = await requirmentClient.post(API_URLS.requirmentClient.createRequirment, { nombre: requirment, descripcion: '' })
    console.log(response.data)
  } catch (error) {
    throw new Error('No se pudo crear el requerimiento')
  }
}

export function useCreateRequirment () {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createRequirment,
    onMutate: async (requirment) => {
      console.log(requirment)
    },
    onSuccess: async () => {
      toast.success('Requerimiento creado')
      await client.invalidateQueries({ queryKey: requirmentsQueryKeys.all })
    },
    onError: () => {
      toast.error('No se pudo crear el requerimiento')
    }
  })
}
