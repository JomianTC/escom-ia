import { getLocalStorage } from '@/utilities/localStorage.utlity'
import { apiClient, commentsClient, iaClient, imageClient, procedureClient, requirmentClient, tagsClient, teacherClient } from './axios'
import { toast } from 'react-toastify'

export function setToken () {
  const token = getLocalStorage('token').value ?? ''
  if (token !== '') {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    teacherClient.defaults.headers.common.Authorization = `Bearer ${token}`
    commentsClient.defaults.headers.common.Authorization = `Bearer ${token}`
    tagsClient.defaults.headers.common.Authorization = `Bearer ${token}`
    imageClient.defaults.headers.common.Authorization = `Bearer ${token}`
    iaClient.defaults.headers.common.Authorization = `Bearer ${token}`
    procedureClient.defaults.headers.common.Authorization = `Bearer ${token}`
    requirmentClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    toast.error('No se ha iniciado sesión')
  }
}
