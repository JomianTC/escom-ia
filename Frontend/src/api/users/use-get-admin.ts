import { type LoginAdminData, type LoginAdminResponse, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminQueryKeys, API_URLS, apiClient } from '../index'
import { toast } from 'react-toastify'

const getAdminDetails = async (data: LoginAdminData) => {
  try {
    const response = await apiClient.post(API_URLS.apiClient.loginAdmin, { ...data })
    const dataAdmin: LoginAdminResponse = response.data
    return dataAdmin
  } catch (err) {
    console.error(err)
    throw new Error('Contraseña o email incorrecto')
  }
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useGetAdmin () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: getAdminDetails,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: adminQueryKeys.all })
    },
    onSuccess: (data) => {
      return data
    },
    onError: (_err, _, context?: TSFixMe) => {
      toast.error('El usuario no existe')
      return { ...context }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
    }
  })
}
