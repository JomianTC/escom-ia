import { type StudentCreatedResponse } from './../../types/api-responses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, apiClient, userQueryKeys } from '../index'
import { type TSFixMe, type Student } from '@/types/index'

const createUserFn = async (newUser: Student) => {
  try {
    const response = await apiClient.post(API_URLS.apiClient.registerUser, newUser)

    const data: StudentCreatedResponse = response.data

    console.log(data)

    return data
  } catch (err) {
    console.error(err)
  }
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
