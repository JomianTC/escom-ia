import { useTeacher } from '@/api/teachers/get-teacher'
import { Bubble } from '@/pages/Home/components/Bubble'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfesorCard } from './components/ProfesorCard'
import Loader from '@/components/Loader'

export function Profesor () {
  const { data, isError, isLoading, isFetching, isRefetching } = useTeacher()
  console.log(data)

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
        <ProfesorCard {...data?.profesor} />
      )}
    </div>
  )
}
