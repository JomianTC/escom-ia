import { type TeacherData, type TeacherRemovedRespose, type TSFixMe } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { teacherClient } from '../axios'

async function deleteTeacher (id: Pick<TeacherData, 'id'>) {
  const response = await teacherClient.delete(`/teacher/${id.id}`)
  const data: TeacherRemovedRespose = response.data
  return data
}

export function useDeleteTeacher () {
  return useMutation({
    mutationFn: deleteTeacher,
    onMutate: async () => {
      // await queryClient.cancelQueries({ queryKey: commentsQueryKeys.all })
    },
    onSuccess: (data) => {
      return data
    },
    onError: (_err, _, context?: TSFixMe) => {
      return []
    },
    onSettled: () => {
      // void queryClient.invalidateQueries({ queryKey: commentsQueryKeys.all })
    }
  })
}
