import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_URLS, procedureClient } from '../axios'

export function useGrantAccess () {
  const { id } = useParams()

  const grantAccess = async (values: { email: string }) => {
    try {
      const response = await procedureClient.post(API_URLS.procedures.givePermission + id, values)
      return response.data
    } catch (error) {
      throw new Error('Error al realizar la actualización')
    }
  }
  return useMutation({
    mutationFn: grantAccess,
    onSuccess: async () => {
      toast.success('Permiso concedido correctamente')
    },
    onError: (error) => {
      toast.error('Error al conceder permiso')
      console.error(error)
    }

  })
}
