import { useGetComments } from '@/api/comments/use-get-comments'
import { useTeacher } from '@/api/teachers/get-teacher'
import Loader from '@/components/Loader'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfesorCard } from './components/ProfesorCard'

export function Profesor () {
  const { data, isError, isLoading, isFetching, isRefetching } = useTeacher()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const { data: comments, hasNextPage, fetchNextPage } = useGetComments(!!data)
  console.log(comments)

  const { reset } = useQueryErrorResetBoundary()
  const navigate = useNavigate()

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
    <div className='container mx-auto'>
      {(isLoading || isFetching || isRefetching) && (<Loader />
      )}
      {((data !== null) && !isFetching && !isRefetching) && (
        <ProfesorCard {...data?.teacherFound} detail={ true} />
      )}
      <button onClick={async () => await  fetchNextPage()}>More</button>
    </div>
  )
}
