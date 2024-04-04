import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { teacherClient } from '../axios'

const createTeacher = async (teacher: Teacher) => {
  const response = await teacherClient.post('', teacher)
  return response.data
}

export function useCreateTeacher () {
  const QueryClient = useQueryClient()
  return useMutation({})
}
