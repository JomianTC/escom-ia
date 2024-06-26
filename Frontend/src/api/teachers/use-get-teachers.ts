import { API_URLS, teacherClient } from '@/api'
import { type TeachersDataResponse } from '@/types/index'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { teacherQueryKeys } from './teachers-query-keys'

// const placeholderData = {
//   profesores: [
//     {
//       id: '0376f5be-d608-4da8-98cd-831dg255592a',
//       nombre: 'Edgardo Adrian Franco',
//       area: 'Sistemas Computacionales',
//       grado_academico: 'Doctor',
//       email: 'eafranco154@gmail.com',
//       contacto: '55123456121',
//       foto_perfil: '/icons/placeholderuser.png',
//       calificacion: '0.00'
//     },
//     {
//       id: '0376f5be-d608-4da8-98cd-831de255532a',
//       nombre: 'Marta Rosa Cordero López',
//       area: '',
//       grado_academico: 'Maestra',
//       email: 'profesoraCordero@gmail.com',
//       contacto: '55123456121',
//       foto_perfil: '/icons/placeholderuser.png',
//       calificacion: '0.00'
//     },
//     {
//       id: '0376f5be-d608-4da8-98cd-831de255592d',
//       nombre: 'Jose Asunción Enriquez Zárate',
//       area: 'Subdirección de Servicios Educativos',
//       grado_academico: 'Maestro en Ciencias',
//       email: 'asuncionez@gmail.com',
//       contacto: '57296000 Ext. 52012',
//       foto_perfil: '/icons/placeholderuser.png',
//       calificacion: '0.00'
//     }],
//   total: 20
// }

const getTeachers = async (page = 1, limit = 1000) => {
  const response = await teacherClient.get(API_URLS.teacherClient.getTeachers, {
    params: {
      page,
      limit
    }
  })
  const { data }: TeachersDataResponse = response
  return data
}
export function useTeachers (resultLimit = 1000) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') ?? 1)
  const [limit, setLimit] = useState(resultLimit)

  const { data, isLoading, isError } = useQuery({
    queryKey: teacherQueryKeys.all,
    queryFn: async () => await getTeachers(Number(page), limit),
    staleTime: 1000
  })
  const handlePageChange = (page: number) => {
    if (page < 1) return
    setPage(Number(page))
    const searchParams = new URLSearchParams()
    searchParams.set('page', page.toString())
    setSearchParams(searchParams.toString())
  }

  return {
    handlePageChange,
    page: Number(page),
    data,
    isLoading,
    isError,
    setLimit
  }
}
