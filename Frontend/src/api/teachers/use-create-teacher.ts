import { type TeacherData, type TeacherFormData, type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import uuid from 'react-uuid'
import { API_URLS, teacherClient } from '../axios'
import { teacherQueryKeys } from './teachers-query-keys'
import { toast } from 'react-toastify'

const createTeacher = async (values: TeacherFormData) => {
  const response = await teacherClient.post(API_URLS.teacherClient.createTeacher, values)
  return response.data
}

export function useCreateTeacher () {
  const pageFromUrl = useLocation().search.split('=')[1] ?? 1

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTeacher,
    onMutate: async (newData: TeacherFormData) => {
      // Realizando un refetch de los comentarios para que se actualice la lista
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.pagination(Number(pageFromUrl)) })
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.pagination(Number(pageFromUrl)) })
      // Obteniendo los teachers que ya se tenían en cache
      const { profesores }: { profesores: TeacherData[] } = queryClient.getQueryData(teacherQueryKeys.pagination(Number(pageFromUrl))) ?? {
        profesores: []
      }

      // Aqui colocar el nuevo profesor que se va a agregar

      const mockTeacher = {
        id: uuid(),
        nombre: newData.nombre,
        area: newData.area,
        grado_academico: newData.grado_academico,
        email: newData.email,
        contacto: newData.contacto,
        foto_perfil: 'https://randomuser.me/api/portraits'
      }

      queryClient.setQueryData(teacherQueryKeys.pagination(Number(pageFromUrl)), () => {
        profesores.unshift(mockTeacher)
        return { profesores }
      })
      return { profesores }
    },
    onSuccess: (data) => {
      toast.success('Profesor creado correctamente')
      // console.log('creado')
      return data
    },
    onError: (_err, _, context?: TSFixMe) => {
      return context?.teachers
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all })
    }
  })
}
