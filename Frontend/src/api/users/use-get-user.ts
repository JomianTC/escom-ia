import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, userQueryKeys } from '../index'
import { type TSFixMe } from '@/types/index'

const LOGIN_PARAM = 'id'

const getUserDetails = async (id: string) => {
  const response = await apiClient.post(`?${LOGIN_PARAM}=${id}`)
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
    onError: (_err, _, context?: TSFixMe) => {
      return []
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all })
    }
  })
}
