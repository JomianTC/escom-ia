import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, procedureClient } from '../axios'
import { proceduresQueryKeys } from './procedures-query-keys'

async function changeState ({ id }: { id: string, estado: boolean }) {
  try {
    const response = await procedureClient.delete(API_URLS.procedures.deleteProcedure + id)
    return response.data
  } catch (error) {
    throw new Error('Error al realizar la actualización')
  }
}

export function useChangeProcedureState () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: changeState,
    onSuccess: async () => {
      toast.success('Cambio de estado realizado correctamente')
      await queryClient.invalidateQueries({ queryKey: proceduresQueryKeys.all })
    },
    onError: (error) => {
      toast.error('Hubo un error con el cambio de estado')
      console.error(error)
    }
  })
}
