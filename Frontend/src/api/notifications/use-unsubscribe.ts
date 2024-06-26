import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_URLS, notificationClient } from '../axios'
import { notificationsQueryKeys } from './notification-query'
import { getLocalStorage } from '@/utilities/localStorage.utlity'
export function useUnsubscribe () {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const removeSubscription = async () => {
    try {
      const response = await notificationClient.delete(API_URLS.notificationRoutes.deleteSubscription + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
        }
      })
      return response.data
    } catch (error) {
      throw new Error('Error al desuscribirse')
    }
  }

  return useMutation({
    mutationFn: removeSubscription,
    onMutate: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationsQueryKeys.detail(id ?? '')
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationsQueryKeys.detail(id ?? '')
      })
      toast.success('Ya no recibiras notificaciones')
    },
    onError: () => {
      toast.error('Oops hubo un error...')
    }

  })
}
