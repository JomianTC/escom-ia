import { useGetComments } from '@/api/comments/use-get-comments'
import { useTags } from '@/api/tags/use-get-tags'
import { useTeacher } from '@/api/teachers/get-teacher'
import Loader from '@/components/Loader'
import Modal, { ModalTrigger } from '@/components/Modal'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'
import CommentBox from './components/CommentBox'
import { ProfesorCard } from './components/ProfesorCard'

export function Profesor () {
  const { data, isError, isLoading, isFetching, isRefetching } = useTeacher()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const { data: comments, hasNextPage, fetchNextPage } = useGetComments(!!data)
  const { data: tags } = useTags()

  const { reset } = useQueryErrorResetBoundary()
  const navigate = useNavigate()

  const hasComments = comments?.pages[0].comentarios.length !== 0

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

  return (
    <div className='container mx-auto grid grid-cols-1 profesor__detail__grid px-4 py-2 md:px-8 gap-4 md:gap-8 h-full'>
      {(isLoading || isFetching || isRefetching) && (<Loader />
      )}
      {((data !== null) && !isFetching && !isRefetching && (tags !== undefined)) && (
        <div className='h-[calc(100%-100px)]'>
          <ProfesorCard {...data} totalComments={comments?.pages[0].total ?? 0 } detail={true}>
          <Modal trigger={
              <ModalTrigger className={' sm:relative opacity-100 bg-bg_200 py-2 px-4 rounded-xl'}>
              <>Comentar</>
            </ModalTrigger>
          }>
            <Modal.Title title="Comentar" />
            <Modal.CommentForm data={tags} />
            <Modal.Controls />
            </Modal>
          </ProfesorCard>
        </div>
      )}
      <div className=''>
        <h1 className='font-bold '>Comentarios</h1>
        <section key={uuid()} className='grid gap-8 p-4 max-h-[600px] overflow-y-scroll custom-scrollbar'>
        {comments?.pages.map((page) => (
          page.comentarios.map((comment) => (
            <CommentBox key={uuid()} comment={comment} />
          ))
        ))}
          {(hasComments)
            ? (<button onClick={async () => await fetchNextPage()} disabled={!hasNextPage}>More</button>)
            : (
              <>
              <img className='w-10/12 mx-auto' src='/icons/robotduda.webp' alt='bot-duda' />
                <p className='text-center text-4xl'>¡Se el primero en comentar!</p>
              </>
              )
          }
        </section>
      </div>
    </div>
  )
}
