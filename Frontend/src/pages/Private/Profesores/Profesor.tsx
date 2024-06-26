import { useGetComments } from '@/api/comments/use-get-comments'
import { useTags } from '@/api/tags/use-get-tags'
import { useTeacher } from '@/api/teachers/get-teacher'
import { CommentFormikForm } from '@/components/CommentForm'
import Loader from '@/components/Loader'
import { ReturnButton } from '@/components/ReturnButton'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { LEVEL_ACCESS } from '@/types/index'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'
import CommentBox from './components/CommentBox'
import { DetailProfessor } from './components/DetailProfessor'

export function Profesor () {
  const { data, isError, isLoading, isFetching, isRefetching } = useTeacher()
  const {
    data: comments
    // hasNextPage,
    // fetchNextPage
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  } = useGetComments(!!data)
  const { data: tags } = useTags()
  const { rol } = useAppSelector((state) => state.auth)
  const canComment = rol === LEVEL_ACCESS.STUDENT

  // const variables = useMutationState({
  //   filters: { mutationKey: ['createComment'], status: 'pending' },
  //   select: (mutation) => mutation.state.variables
  // })

  // console.log(variables[0])

  const { reset } = useQueryErrorResetBoundary()
  const navigate = useNavigate()

  // const hasComments = comments?.pages[0].comentarios.length !== 0

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
    <div className='container mx-auto grid grid-cols-1 profesor__detail__grid px-4 py-2 md:px-8 gap-4 md:gap-8 h-full z-[600] overflow-y-scroll '>
      {/* {(isLoading || isFetching || isRefetching) && (<Loader />
      )} */}
      {/* {false */}
      {((data !== null) && !isFetching && !isRefetching && (tags !== undefined))
        ? (
        <div className='h-96  sm:h-full py-8 z-50'>
          <DetailProfessor {...data} totalComments={comments?.pages[0].total ?? 0 } detail={true}>
          </DetailProfessor>
        </div>
          )
        : (<Loader/>) }
      <div className='relative'>
        <div className='flex justify-between'>
          <h1 className='font-bold z-[600] relative '>
                Comentarios
          </h1>
          <ReturnButton styles='right-0 top-0 z-[1000]'/>
        </div>

        <section key={uuid()} className=' comment-section overflow-hidden relative z-[900] '>
          <div className='overflow-y-scroll grid gap-8 p-4 custom-scrollbar max-h-[640px] relative z-[600] '>
            {canComment && (
              <>
                <CommentFormikForm data={tags ?? []} profesorName={data?.nombre ?? ''} />
              </>
            )}

              {comments?.pages.map((page) => (
                page.comentarios.reverse().map((comment) => (
                  <CommentBox key={uuid()} comment={comment} owner={false} />
                ))
              ))}
                {/* {(hasComments)
                  ? (<button onClick={async () => await fetchNextPage()} disabled={!hasNextPage}>More</button>)
                  : (
                    <>
                    <img className='w-10/12 mx-auto' src='/icons/robotduda.webp' alt='bot-duda' />
                      <p className='text-center text-4xl'>¡Se el primero en comentar!</p>
                    </>
                    )
                } */}
        </div>
        </section>
      </div>
    </div>
  )
}
