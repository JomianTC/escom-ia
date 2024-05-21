import { type LoginData, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, apiClient, userQueryKeys } from '../index'
import { toast } from 'react-toastify'

const getUserDetails = async (data: LoginData) => {
  const response = await apiClient.post(API_URLS.apiClient.loginUser, { ...data })
  return response.data
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useGetUser () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: getUserDetails,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: userQueryKeys.all })
    },
    onSuccess: (data) => {
      return data
    },
    onError: (_err, _, _context?: TSFixMe) => {
      toast.error('El usuario no existe')
      return []
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all })
    }
  })
}
