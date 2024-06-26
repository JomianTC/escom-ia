import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { API_URLS, iaClient } from '../axios'

async function useGetResponse (message: string[]) {
  try {
    const response = await iaClient.post(API_URLS.ia.askSomething, { consultas: message })
    const data = response.data
    console.log(data)

    return data
  } catch (error: any) {
    const data = error.response?.data
    if (data.mensaje === 'No se encontraron trámites') { return { mensaje: 'No se encontraron trámites' } }
    throw new Error('Algo salio mal')
  }
}

export function useAskSomething () {
  return useMutation({
    mutationKey: ['getIAComment'],
    mutationFn: useGetResponse,
    onMutate: async (variables) => {
      return variables
    },
    onError: (error: AxiosError) => {
      console.log(error)
      alert('Algo salio mal')
    }
  })
}
