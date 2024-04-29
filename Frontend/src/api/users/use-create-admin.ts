import { type Admin, type RegisterAdminResponse, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, apiClient, userQueryKeys } from '../index'
import { toast } from 'react-toastify'

const createAdminFn = async (newUser: Admin) => {
  try {
    const response = await apiClient.post(API_URLS.apiClient.registerAdmin, newUser)
    const data: RegisterAdminResponse = response.data
    return data
  } catch (err) {
    throw new Error('Algo salio mal')
  }
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useCreateAdmin () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAdminFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: userQueryKeys.all })
    },
    onSuccess: (data) => {
      toast.info('Admin creado')
      return data
    },
    onError: (_err, _newUser, context?: TSFixMe) => {
      toast.error('Algo salio mal')
      return context
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all })
    }
  })
}
