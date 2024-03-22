import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, userQueryKeys } from '../index'
import { type TSFixMe, type Student } from '@/types/index'

const createUserFn = async (newUser: Student) => {
  const response = await apiClient.post('register', newUser)
  console.log(newUser)

  return response.data
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useCreateUser () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUserFn,
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
