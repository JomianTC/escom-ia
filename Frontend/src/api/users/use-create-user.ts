import { type Student, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URLS, apiClient, userQueryKeys } from '../index'
import { type StudentCreatedResponse } from './../../types/api-responses'
import { toast } from 'react-toastify'

const createUserFn = async (newUser: Student) => {
  const { foto_perfil: fotoPerfil, ...user } = newUser
  console.log(user)

  try {
    const response = await apiClient.post(API_URLS.apiClient.registerUser, user)

    const data: StudentCreatedResponse = response.data
    return data
  } catch (err) {
    throw new Error('Algo salio mal')
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
    onError: (_err, _newUser, context?: TSFixMe) => {
      toast.error('Algo salio mal')
      return context
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all })
    }
  })
}
