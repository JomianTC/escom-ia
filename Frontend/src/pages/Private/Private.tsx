import EditInfoModal from '@/components/EditInfoModal'
import { NavBar } from '@/components/NavBar'
import { PRIVATE_ROUTES } from '@/models'
import { type IRoute } from '@/types/index'
import { RoleGuard } from '@guards/index.ts'
import RoutesWithNotFound from '@utils/RoutesWithNotFound'
import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { Bubble } from '../Home/components/Bubble'
import { DashboardAdmin } from './Dashboard/DashboardAdmin'
import { EditarTags } from './Dashboard/EditarTags'
import { EditarProfesores, EditProfesor } from './Dashboard/EditarProfesores'
const Dashboard = lazy(async () => await import('@/pages/Private/Dashboard/Dashboard'))

export default function Private () {
  return (
    <>
      <NavBar>
        <EditInfoModal />
      </NavBar>
      <main className='main__container relative z-0 ' data-theme="dark">
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
            <Route path={'dashboardadmin'} element={<DashboardAdmin />} >
            <Route path={'/dashboardadmin'} element={<h1>Perfil del administrador</h1>} />
              <Route path={'editarTags'} element={<EditarTags/>} />
              <Route path={'profesores-editar'} element={<EditarProfesores/>} />
              <Route path={'profesores-editar/:id'} element={<EditProfesor/>} />
              <Route path={'*'} element={<Navigate to={'/private/dashboardadmin/editarTags'}/>} />
              </Route>
          </Route>
        </RoutesWithNotFound>
      <Bubble index='4' size='w-72 h-72' key={'bubblebg1'} extraPos='top-[230px]' left='20%' extraStyles={{ zIndex: 20, animation: 'none', opacity: 0.6 }} animation='none'/>
      <Bubble index='4' size='w-72 h-72' key={'bubblebg2'} extraPos='top-[800px] md:top-[500px] md:left-[700px]'extraStyles={{ zIndex: 20, animation: 'none', opacity: 0.5, backdropFilter: 'blur(10px)' }} animation='none'/>
      <Bubble index='4' size='w-60 h-60' key={'bubblebg3'} extraPos='top-[1200px] md:top-[300px] right-0 md:right-48'extraStyles={{ zIndex: 20, animation: 'none', opacity: 0.5, backdropFilter: 'blur(10px)' }} animation='none'/>
      </main >
    </>
  )
}
