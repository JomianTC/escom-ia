import EditInfoModal from '@/components/EditInfoModal'
import { NavBar } from '@/components/NavBar'
import { PRIVATE_ROUTES } from '@/models'
import { type IRoute } from '@/types/index'
import { AuthGuards, RoleGuard } from '@guards/index.ts'
import RoutesWithNotFound from '@utils/RoutesWithNotFound'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
const Dashboard = lazy(async () => await import('@/pages/Private/Dashboard/Dashboard'))

export default function Private () {
  return (
    <>
      <NavBar>
        <EditInfoModal />
      </NavBar>
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
          <Route element={<RoleGuard rol={'admin'} />}>
            <Route path={'privadaValidada'} element={<h1>Admin podra eliminar</h1>} />
          </Route>
        </RoutesWithNotFound>
      </main >
      <ToastContainer />
    </>
  )
}