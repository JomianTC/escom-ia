import { useMutation } from '@tanstack/react-query'
import { API_URLS, iaClient } from '../axios'
import { getLocalStorage } from '@/utilities/localStorage.utlity'

async function useGetResponse (message: string) {
  const token = getLocalStorage('token')
  iaClient.defaults.headers.common.Authorization = `Bearer ${token.value}`
  try {
    const response = await iaClient.post(API_URLS.ia.askSomething, { consulta: message })
    const data = response.data
    return data
  } catch (error) {
    throw new Error('Algo salio mal')
  }
}

export function useAskSomething () {
  return useMutation({
    mutationKey: ['getIAComment'],
    mutationFn: useGetResponse,
    onMutate: async (variables) => {
      return variables
    }
  })
}
