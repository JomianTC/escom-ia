import { teacherClient } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { teacherQueryKeys } from './teachers-query-keys'

const getTeachers = async () => {
  const response = await teacherClient.get('all')
  console.log(response)
  return response.data
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useTeachers () {
  return useQuery({
    queryKey: teacherQueryKeys.all,
    queryFn: getTeachers
  })
}
