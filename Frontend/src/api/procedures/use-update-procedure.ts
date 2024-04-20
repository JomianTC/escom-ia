import { type Procedure } from '@/types/api-responses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_URLS, procedureClient } from '../axios'
import { proceduresQueryKeys } from './procedures-query-keys'

export function useUpdateProcedure (id: string) {
  const navigate = useNavigate()
  async function updateProcedure (procedure: Procedure) {
    try {
      const { requerimientos, id, ...procedureFiltered } = procedure

      const response = await procedureClient.put(`${API_URLS.procedures.updateProcedure}${id}`, procedureFiltered)

      const data = response.data
      return data
    } catch (error) {
      throw new Error('No se pudo actualizar el trámite')
    }
  }

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProcedure,
    onMutate: async () => {
      toast.info('Actualizando trámite')
      await queryClient.cancelQueries({ queryKey: proceduresQueryKeys.all })
    },
    onSuccess: (data) => {
      toast.success('Trámite actualizado')
      navigate('/private/tramites')
      return data
    },
    onError: (_err, procedure, context) => {
      toast.error('No se pudo actualizar el trámite')
    }
  })
}
