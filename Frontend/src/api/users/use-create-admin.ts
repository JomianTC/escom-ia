import { type Admin, type RegisterAdminResponse, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, apiClient, userQueryKeys } from '../index'

const createAdminFn = async (newUser: Admin) => {
  try {
    const response = await apiClient.post(API_URLS.apiClient.registerAdmin, newUser)

    const data: RegisterAdminResponse = response.data

    return data
  } catch (err) {
    console.error(err)
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
      return data
    },
    onError: (_err, newUser, context?: TSFixMe) => {
      queryClient.setQueryData(userQueryKeys.all, context.previousUsers)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all })
    }
  })
}
