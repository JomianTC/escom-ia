import { NavBar } from '@/components/NavBar'
import { PRIVATE_ROUTES } from '@/models'
import { type IRoute } from '@/types/index'
import { AuthGuards } from '@guards/index.ts'
import RoutesWithNotFound from '@utils/RoutesWithNotFound'
import { Route } from 'react-router-dom'

// const Home = lazy(async () => await import('./Home/Home'))

export default function Private () {
  return (
    <>
            <NavBar />
            <div className='main-container flex-grow px-4' data-theme="dark">
                <RoutesWithNotFound>
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
            </div >
        </>
  )
}
