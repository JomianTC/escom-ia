import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, requirmentClient } from '../axios'
import { requirmentsQueryKeys } from './requirments-query-keys'
import { toast } from 'react-toastify'
import { getLocalStorage } from '@/utilities/localStorage.utlity'

async function createRequirment (requirment: string) {
  const token = getLocalStorage('token')
  requirmentClient.defaults.headers.common.Authorization = `Bearer ${token.value}`
  try {
    const response = await requirmentClient.post(API_URLS.requirmentClient.createRequirment, { nombre: requirment, descripcion: '' })
    return response.data
  } catch (error) {
    throw new Error('No se pudo crear el requerimiento')
  }
}

export function useCreateRequirment () {
  const client = useQueryClient()
  return useMutation({
    mutationFn: createRequirment,
    onSuccess: async () => {
      toast.success('Requerimiento creado')
      await client.invalidateQueries({ queryKey: requirmentsQueryKeys.all })
    },
    onError: () => {
      toast.error('No se pudo crear el requerimiento')
    }
  })
}
