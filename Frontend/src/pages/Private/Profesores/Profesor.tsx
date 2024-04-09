import { useCreateComment } from '@/api/comments/use-create-comment'
import { useGetComments } from '@/api/comments/use-get-comments'
import { useTags } from '@/api/tags/use-get-tags'
import { useTeacher } from '@/api/teachers/get-teacher'
import Loader from '@/components/Loader'
import Modal, { ModalTrigger } from '@/components/Modal'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import uuid from 'react-uuid'
import CommentBox from './components/CommentBox'
import { ProfesorCard } from './components/ProfesorCard'

export function Profesor () {
  const { data, isError, isLoading, isFetching, isRefetching } = useTeacher()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const { data: comments, hasNextPage, fetchNextPage } = useGetComments(!!data)
  const { data: tags } = useTags()
  const createComment = useCreateComment()

  const { reset } = useQueryErrorResetBoundary()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        reset()
        navigate(-1)
      }, 2000)
      return () => {
        clearTimeout(timer)
        reset()
      }
    }
  }, [isError])

  useEffect(() => {
    if (data === undefined && !isLoading) {
      navigate(-1)
    }
  }, [data])

  const handleSubmit = (values) => {
    const comment = {
      ...values,
      id_profesor: id
    }
    createComment.mutate(comment)
  }
  return (
    <div className='container mx-auto'>
      {(isLoading || isFetching || isRefetching) && (<Loader />
      )}
      {((data !== null) && !isFetching && !isRefetching && (tags !== undefined)) && (
        <>
          <ProfesorCard {...data?.teacherFound} detail={true} />
          <Modal trigger={
              <ModalTrigger className={' sm:relative opacity-100 bg-bg_200 py-2 px-4 rounded-xl'}>
              <>Comentar</>
            </ModalTrigger>
          }>
            <Modal.Title title="Comentar" />
            <Modal.CommentForm data={tags} handleSubmit={handleSubmit} />
            <Modal.Controls />
          </Modal>
        </>
      )}
      <h2>Comentarios</h2>
      <section key={uuid()} className='grid  md:grid-cols-3 gap-8 p-4'>
      {comments?.pages.map((page) => (
        page.comentarios.map((comment) => (
          <CommentBox key={uuid()} comment={comment} />
        ))
      ))}
          </section>
      <button onClick={async () => await fetchNextPage()} disabled={ !hasNextPage}>More</button>
    </div>
  )
}
