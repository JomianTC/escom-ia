import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, apiClient, userQueryKeys } from '../index'
import { type TSFixMe, type Student } from '@/types/index'
import { toast } from 'react-toastify'

const updateUser = async (newUser: Student) => {
  const response = await apiClient.post(API_URLS.apiClient.registerUser, newUser)
  return response.data
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useUpdateUser () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: userQueryKeys.all })
    },
    onSuccess: (data) => {
      toast.success('Usuario actualizado correctamente')
      return data
    },
    onError: (_err, _newUser, context?: TSFixMe) => {
      toast.success('Algo no salio como debía')
      queryClient.setQueryData(userQueryKeys.all, context.previousUsers)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all })
    }
  })
}
