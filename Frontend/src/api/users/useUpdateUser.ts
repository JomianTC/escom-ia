import { type Student, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, imageClient, userQueryKeys } from '../index'

const updateUser = async (newUser: Student) => {
  const { foto_perfil: fotoPerfil, contrasena, boleta, ...rest } = newUser
  console.log(rest)

  const response = await imageClient.put(API_URLS.userPictureClient.updateInfo, rest)
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
