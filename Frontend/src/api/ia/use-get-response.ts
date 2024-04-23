import { useMutation } from '@tanstack/react-query'
import { API_URLS, iaClient } from '../axios'

async function useGetResponse (message: string) {
  try {
    const response = await iaClient.post(API_URLS.ia.askSomething, { message })
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