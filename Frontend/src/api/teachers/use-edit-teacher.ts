import { type TeacherData } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_URLS, teacherClient } from '../axios'
import { teacherQueryKeys } from './teachers-query-keys'
type ValidSex = 'masculino' | 'femenino'
export function useEditTeacher () {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const naviagate = useNavigate()
  async function updateTeacher (values: TeacherData & { sexo: ValidSex }) {
    const { calificacion, foto_perfil: fotoPerfil, sexo, id: formId, ...filteredValues } = values
    console.log(filteredValues)

    try {
      const response = await teacherClient.put(API_URLS.teacherClient.updateTeacher + id, filteredValues)
      const data = response.data
      return data.profesor
      // Aquí va la lógica para actualizar el profesor
    } catch (error) {
      throw new Error('Error al realizar la actualización')
    }
  }

  return useMutation({
    mutationFn: updateTeacher,
    onError: (error) => {
      toast.error('Error al actualizar el profesor')
      console.error(error)
    },
    onSuccess: async () => {
      toast.success('Profesor actualizado correctamente')
      await queryClient.invalidateQueries({
        queryKey: teacherQueryKeys.all
      })
      naviagate('/private/dashboardadmin/profesores-editar')
    }
  })
}
