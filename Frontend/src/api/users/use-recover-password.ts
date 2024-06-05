import { useMutation } from '@tanstack/react-query'
import { API_URLS, imageClient } from '../axios'
import { toast } from 'react-toastify'
import { type AxiosError } from 'axios'

export function useRecoverPassword () {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await imageClient.post(API_URLS.userPictureClient.resetPassword, {
        email_recuperacion: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data
    },
    onError: (error: AxiosError) => {
      console.log(error)
      toast.error('El correo no existe en la base de datos')
    },
    onSuccess: () => {
      toast.success('Correo enviado')
    }
  })
}
