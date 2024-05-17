import { type TeacherData, type TeacherRemovedRespose, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, teacherClient } from '../axios'
import { teacherQueryKeys } from './teachers-query-keys'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { getLocalStorage } from '@/utilities/localStorage.utlity'

async function deleteTeacher (id: Pick<TeacherData, 'id'>) {
  const token = getLocalStorage('token')
  teacherClient.defaults.headers.common.Authorization = `Bearer ${token.value}`
  try {
    const response = await teacherClient.delete(`${API_URLS.teacherClient.deleteTeacher}/${id.id}`)
    const data: TeacherRemovedRespose = response.data
    return data
  } catch (err: any) {
    throw new Error('No se ha podido eliminar el profesor')
  }
}

export function useDeleteTeacher () {
  const { infoModal } = useAppSelector((state) => state.ui)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTeacher,
    mutationKey: teacherQueryKeys.delete(infoModal.id),
    onMutate: async () => {

    },
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.all })
      await queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all })
      toast.success('Profesor eliminado correctamente')
      return data
    },
    onError: (_err, _, context?: TSFixMe) => {
      toast.error('No se ha podido eliminar el profesor')
      return context?.teachers
    },
    onSettled: () => {
      // void queryClient.invalidateQueries({ queryKey: commentsQueryKeys.all })
    }
  })
}
