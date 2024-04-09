import { type TagsCreatedResponse } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tagsClient } from '../axios'
import { tagQueryKeys } from './tags-query-keys'

async function createTag (tag: string) {
  const respose = await tagsClient.post('/tags', { nombre: tag })
  const data: TagsCreatedResponse = respose.data
  return data
}

export function useCreateTag () {
  const queryClient = useQueryClient()
  const queryKey = tagQueryKeys.all
  return useMutation(
    {
      mutationFn: createTag,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey })
      }
    }
  )
}
