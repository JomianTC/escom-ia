import { useGetComments } from '@/api/comments/use-get-user-comments'
import { type AllUserComments } from '@/types/api-responses'
import CommentBox from '../Profesores/components/CommentBox'
import { DeleteCommentModal } from './DeleteCommentModal'

export function ComentariosPage () {
  const { data } = useGetComments()

  return (
    <section className='container p-8 w-full h-full my-0 mx-auto grid gap-2 sm:gap-6 relative z-40 overflow-y-scroll custom-scrollbar sm:grid-cols-2 auto-rows-min content-center'>
      {data?.comentarios.map((comment: AllUserComments) => <CommentBox key={comment.comentario.id} comment={comment} owner id={comment.comentario.id} />)}
      {data?.comentarios.length === 0 && <div className='col-span-full self-center'>
        <h1 className='text-center sm:text-3xl md:text-5xl'>Aún no haces ningún comentario</h1>
        <p className='text-center text-base sm:text-xl  '>¡Anímate a dejar tu opinión sobre un profesor!</p>
      </div>
      }
      <DeleteCommentModal />
    </section>
  )
}
