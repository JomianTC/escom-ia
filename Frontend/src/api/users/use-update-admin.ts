import { type Admin, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, apiClient, userQueryKeys } from '../index'

const updateAdmin = async (admin: Admin) => {
  try {
    const response = await apiClient.put(API_URLS.apiClient.registerAdmin, admin)
    return response.data
  } catch (error) {
    throw new Error('Error al actualizar el usuario')
  }
}
export function useUpdateAdmin () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAdmin,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: userQueryKeys.all })
    },
    onSuccess: (data) => {
      toast.success('Usuario actualizado correctamente')
      return data
    },
    onError: (_err, _admin, context?: TSFixMe) => {
      toast.success('Algo no salio como debía')
      queryClient.setQueryData(userQueryKeys.all, context.previousUsers)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all })
    }
  })
}
