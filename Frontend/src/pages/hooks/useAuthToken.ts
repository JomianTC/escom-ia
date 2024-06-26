import { getLocalStorage } from '@/utilities/localStorage.utlity'
import { toast } from 'react-toastify'
import { apiClient, commentsClient, iaClient, imageClient, notificationClient, procedureClient, requirmentClient, tagsClient, teacherClient } from '../../api/axios'

export function setToken (tokenReceived = '') {
  const token = getLocalStorage('token').value?.trim() ?? tokenReceived.trim()
  if (token !== '') {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    teacherClient.defaults.headers.common.Authorization = `Bearer ${token}`
    commentsClient.defaults.headers.common.Authorization = `Bearer ${token}`
    tagsClient.defaults.headers.common.Authorization = `Bearer ${token}`
    imageClient.defaults.headers.common.Authorization = `Bearer ${token}`
    iaClient.defaults.headers.common.Authorization = `Bearer ${token}`
    procedureClient.defaults.headers.common.Authorization = `Bearer ${token}`
    requirmentClient.defaults.headers.common.Authorization = `Bearer ${token}`
    notificationClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    toast.info('No se ha iniciado sesión')
  }
}
