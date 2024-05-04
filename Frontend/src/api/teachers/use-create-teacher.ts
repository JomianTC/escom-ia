import { type TeacherData, type TeacherFormData, type TSFixMe } from '@/types/index'
import { getRandomAvatar } from '@/utilities/avatarURL'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import uuid from 'react-uuid'
import { API_URLS, teacherClient } from '../axios'
import { teacherQueryKeys } from './teachers-query-keys'

type ValidSex = 'masculino' | 'femenino'

const createTeacher = async (values: (TeacherFormData & { sexo: ValidSex })) => {
  const { sexo, foto_perfil, calificacion, id, ...teacherData } = values
  const response = await teacherClient.post(API_URLS.teacherClient.createTeacher, teacherData)
  const { profesor } = response.data
  const avatarURL = getRandomAvatar(sexo)
  const profilePicture = await teacherClient.put(API_URLS.teacherClient.updateProfilePicture + profesor.id, { url: avatarURL })
  console.log(profilePicture.data)
  return response.data
}

export function useCreateTeacher () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTeacher,
    onMutate: async (newData: TeacherFormData) => {
      // Realizando un refetch de los comentarios para que se actualice la lista
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.all })
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.all })
      // Obteniendo los teachers que ya se tenían en cache
      const { profesores }: { profesores: TeacherData[] } = queryClient.getQueryData(teacherQueryKeys.all) ?? {
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

      queryClient.setQueryData(teacherQueryKeys.all, () => {
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
      toast.error('Algo salío mal')
      return context?.teachers
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all })
    }
  })
}
