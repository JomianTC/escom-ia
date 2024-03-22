import './App.css'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'
import AuthGuards from './guards/auth.guards'
import RoleGuard from './guards/role.guard'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './models/ROUTES'
import { store } from './store/store'
import RoutesWithNotFound from './utilities/RoutesWithNotFound'
import { Register } from './pages/Register/Register'
import { Home } from './pages/Home/Home'

import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'
// LAZYLOADING DE LOGIN Y LAS PARTES PRIVADAS

const Login = lazy(async () => await import('./pages/Login/Login'))
const Private = lazy(async () => await import('./pages/Private/Private'))
const queryClient = new QueryClient()

function App () {
  return (
    <>
          <QueryClientProvider client={queryClient}>
      <Suspense fallback={ <>Loading ...</> }>
        <Provider store={ store }>
          {/* <h3 >Este elemento se visualiza en todas partes</h3> */}
          <RoutesWithNotFound>
            <Route path="/" element={ <Navigate to={ PRIVATE_ROUTES.PRIVATE } /> } />
            <Route path={ PUBLIC_ROUTES.LOGIN } element={ <Login /> } />
            <Route path={ PUBLIC_ROUTES.REGISTER } element={ <Register/> } />
            <Route path={ PUBLIC_ROUTES.HOME } element={ <Home/> } />

            <Route element={<AuthGuards privateValidation={true} />} >  {/* Nos permite proteger las rutas privadas que tiene dentro,  */}
              <Route path={ `${PRIVATE_ROUTES.PRIVATE}/*` } element={ <Private /> } />
            </Route>

            <Route element={ <RoleGuard rol="ADMIN" /> } >
              <Route path="admin" element={ <h3>Este es el panel de administrador</h3> } />
            </Route>

          </RoutesWithNotFound>

        </Provider >

      </Suspense>
      </QueryClientProvider>

    </>
  )
}

export default App
