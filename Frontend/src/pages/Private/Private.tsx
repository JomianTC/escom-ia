import { NavBar } from '@/components/NavBar'
import { PRIVATE_ROUTES } from '@/models'
import { type IRoute } from '@/types/index'
import { AuthGuards } from '@guards/index.ts'
import RoutesWithNotFound from '@utils/RoutesWithNotFound'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
const Dashboard = lazy(async () => await import('@/pages/Private/Dashboard/Dashboard'))

export default function Private () {
  return (
    <>
      <NavBar />
      <main className='main__container ' data-theme="dark">
        <RoutesWithNotFound>
          <Route path={'/'} element={<Dashboard />} />
          {
            PRIVATE_ROUTES.map((route: IRoute) => {
              if (route.component !== undefined && route.component !== null) {
                return <Route key={route.path} path={route.path} element={<route.component />} />
              }
              return null
            }
            )
          }
          <Route element={<AuthGuards privateValidation={false} />}>
            <Route path={'privadaValidada'} element={<h1>RUTA PRIVADA VALIDADA</h1>} />
          </Route>
        </RoutesWithNotFound>
      </main >
    </>
  )
}
