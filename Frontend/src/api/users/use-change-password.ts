import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS } from '../axios'
import { imageClient } from './../axios'

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: { email_recuperacion: string, contrasena: string }) => {
      const response = await imageClient.put(API_URLS.userPictureClient.updatePassword, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data
    },
    onSuccess: () => {
      toast.success('Contraseña actualizada correctamente')
    },
    onError: () => {
      toast.error('Error al modificar la contraseña')
    }

  })
}
