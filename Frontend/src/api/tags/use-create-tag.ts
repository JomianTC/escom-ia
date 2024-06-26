import { type TagsCreatedResponse } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { API_URLS, tagsClient } from '../axios'
import { tagQueryKeys } from './tags-query-keys'

async function createTag (tag: { nombre: string }) {
  try {
    const respose = await tagsClient.post(API_URLS.tagClient.createTag, tag)
    const data: TagsCreatedResponse = respose.data
    return data
  } catch (error) {
    throw new Error('Algo no salio como se esperaba al crear el tag')
  }
}

export function useCreateTag () {
  const queryClient = useQueryClient()
  const queryKey = tagQueryKeys.all
  return useMutation(
    {
      mutationFn: createTag,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey })
        toast.success('Tag creado con éxito')
      },
      onError: (error) => {
        toast.error(error.message)
        console.error(error)
      }
    }
  )
}
