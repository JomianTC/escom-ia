import { API_URLS, teacherClient } from '@/api'
import { type TeacherDataResponse } from '@/types/index'
import { getLocalStorage } from '@/utilities/localStorage.utlity'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { teacherQueryKeys } from './teachers-query-keys'

// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useTeacher () {
  const token = getLocalStorage('token')
  // console.log(token)
  teacherClient.defaults.headers.common.Authorization = `Bearer ${token.value}`
  const { id } = useParams()
  const getTeacher = async () => {
    // /
    const response: TeacherDataResponse = await teacherClient.get(API_URLS.teacherClient.getTeachers + id)

    return response.data
  }

  // const errorHandling = async () => {
  //   const { data } = await teacherClient.get('/renew')
  // }

  return useQuery({
    queryKey: teacherQueryKeys.detail(id ?? ''),
    queryFn: getTeacher,
    // throwOnError: (error, query) => {
    //   if (error.response?.status === 403) {
    //     errorHandling()
    //   }
    //   return false
    // },
    // retry: (count, error) => {
    //   if (error.response?.status === 403 && count < 2) {
    //     // errorHandling()
    //   }
    //   return count < 2
    // },
    refetchOnWindowFocus: true,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
