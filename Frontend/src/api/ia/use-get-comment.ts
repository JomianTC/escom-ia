import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, iaClient } from '../axios'
async function getIAComment (values: { tags: string[], nombre: string }) {
  try {
    const response = await iaClient.post(API_URLS.ia.createComment, {
      tags: values.tags,
      nombre: values.nombre
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Oops esto es por nosotros no por ti, intenta de nuevo más tarde')
  }
}
export function useGetIAComment () {
  return useMutation({
    mutationKey: ['getIAComment'],
    mutationFn: getIAComment,
    onMutate: async (variables) => {
      // Aca se puede hacer algo antes de que se ejecute la mutación
      toast.info('Generando comentario...')
      return variables
    },
    onError: (error) => {
      // Aca se puede hacer algo si la mutación falla
      toast.error('Error al generar un comentario')
      return error.message
    }
  })
}
