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
    const response = await notificationClient.delete(API_URLS.notificationRoutes.deleteSubscription + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getLocalStorage('token').value ?? ''
      }
    })
    return response.data
  }

  return useMutation({
    mutationFn: removeSubscription,
    onMutate: () => {
      toast.info('Eliminando alertas...')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationsQueryKeys.detail(id ?? '')
      })
      toast.success('¡Funciono!')
    },
    onError: () => {
      toast.error('Oops hubo un error...')
    }

  })
}
