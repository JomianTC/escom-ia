import { type TSFixMe } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { API_URLS, commentsClient } from '../index'
import { tagQueryKeys } from '../tags/tags-query-keys'
import { type CommentCreatedResponse } from './../../types/api-responses'
import { commentsQueryKeys } from './comments-query-keys'

const createComment = async (data: any) => {
  const response = await commentsClient.post(API_URLS.commentsClient.createComment, { ...data })
  const { data: commentResponse }: { data: CommentCreatedResponse } = response
  return commentResponse
}
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useCreateComment () {
  const queryClient = useQueryClient()
  const { nombres, apellidos, foto_perfil: fotoPerfil } = useSelector(store => store.user)

  return useMutation({
    mutationFn: createComment,
    onMutate: async (newData) => {
      // Realizando un refetch de los comentarios para que se actualice la lista
      await queryClient.cancelQueries({ queryKey: commentsQueryKeys.all })
      const tags: any[] = queryClient.getQueryData(tagQueryKeys.pagination(1)) ?? []
      const previousComments = queryClient.getQueryData(commentsQueryKeys.all)
      const tagsToShow = newData.tags.map((tag: string) => {
        return tags?.find((tagData: { value: string, label: string }) => tagData.value === tag)?.label
      })

      // Aqui colocar el comentario que se va a agregar
      console.log(newData)
      const mockComment = {
        comentario: { puntuacion: newData.puntuacion, comentario: newData.comentario, fecha: '2020-10-10' },
        id: newData.id_profesor,
        tags: tagsToShow,
        usuario: { nombres, apellidos, foto_perfil: fotoPerfil }
      }

      queryClient.setQueryData(commentsQueryKeys.all, (old: any) => {
        const { pages, pageParams } = previousComments
        console.log(pages)
        console.log(pageParams)
        pages[0].comentarios.unshift(mockComment)
        console.log(pages[0].comentarios)
        return { pages, pageParams }
      })
      return { previousComments }
    },
    onSuccess: (data) => {
      return data
    },
    onError: (_err, _, context?: TSFixMe) => {
      return context?.previousComments
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: commentsQueryKeys.all })
    }
  })
}
