import { teacherClient } from '@/api'
import { getLocalStorage } from '@/utilities/localStorage.utlity'
import { useQuery } from '@tanstack/react-query'
import { teacherQueryKeys } from './teachers-query-keys'

const getTeachers = async (page = 1, limit = 10) => {
  const { token } = getLocalStorage('token')

  teacherClient.defaults.headers.common.Authorization = `Bearer ${token}`
  const response = await teacherClient.get('all', {
    params: {
      page,
      limit
    }
  })
  return response.data
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useTeachers (limit: number = 10, page: number = 1) {
  return useQuery({
    queryKey: teacherQueryKeys.all,
    queryFn: async () => await getTeachers(page, limit)
  })
}
