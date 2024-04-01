import { useTeacher } from '@/api/teachers/get-teacher'
import { Bubble } from '@/pages/Home/components/Bubble'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfesorCard } from './components/ProfesorCard'

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
      {(isLoading || isFetching || isRefetching) && (<div className='relative my-0 mx-auto '>
      <Bubble index="3" top="0px" left='0px' size="w-16 h-16 loader loader" extraStyles={{ zIndex: 40 }}/>
                <Bubble index="2" top="0px" left='-100px' size="w-32 h-32 loader " extraStyles={{ zIndex: 40 }}/>
        <Bubble index="4" top="0px" left='0px' size="w-16 h-16 loader " extraStyles={{ zIndex: 40 }}/>
      </div>
      )}
      {((data !== null) && !isFetching && !isRefetching) && (
        <ProfesorCard {...data?.profesor} />
      )}
    </div>
  )
}
