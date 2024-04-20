import { useQuery } from '@tanstack/react-query'
import { API_URLS, requirmentClient } from '../axios'
import { requirmentsQueryKeys } from './requirments-query-keys'
const defaultValue = [{
  label: 'buen profesor',
  value: 'buen profesor'
}]
async function getAllRequirments () {
  try {
    const response = await requirmentClient.get(API_URLS.requirmentClient.getRequirments)
    const data = response.data
    const formattedResponse = data?.requirementos.map((requirment: { nombre: string, id: string }) => {
      return {
        label: requirment.nombre,
        value: requirment.id
      }
    }
    )
    return formattedResponse ?? defaultValue
  } catch (error) {
    console.error(error)
  }
}

export function useGetRequirments () {
  const { data, isLoading } = useQuery({
    queryKey: requirmentsQueryKeys.all,
    queryFn: getAllRequirments,
    staleTime: 1000
  })
  return {
    data,
    isLoading
  }
}
