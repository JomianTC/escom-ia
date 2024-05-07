import { Home } from '@/pages/Home/Home'
import Register from '@/pages/Register/Register'
import { AuthGuards, RoleGuard } from '@guards/index.ts'
import { PRIVATE_ROUTES_MODEL, PUBLIC_ROUTES_MODEL } from '@models/ROUTES'
import { store } from '@store/store'
import RoutesWithNotFound from '@utils/RoutesWithNotFound'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Login } from './pages/Login'
import Private from './pages/Private/Private'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import Loader from './components/Loader'
// LAZYLOADING DE LOGIN Y LAS PARTES PRIVADAS

const queryClient = new QueryClient()

function App () {
  return (
        <>
            <QueryClientProvider client={queryClient} >
                <Suspense fallback={<Loader/>}>
                    <Provider store={store}>
                        {/* <h3 >Este elemento se visualiza en todas partes</h3> */}
                        <RoutesWithNotFound>
                            <Route
                                path="/"
                                element={<Navigate to={PRIVATE_ROUTES_MODEL.PRIVATE.path}/>}
                            />
                            <Route
                                path={PUBLIC_ROUTES_MODEL.LOGIN.path}
                                element={<Login />}
                            />
                            <Route
                                path={PUBLIC_ROUTES_MODEL.REGISTER.path}
                                element={<Register />}
                            />
                            <Route
                                path={PUBLIC_ROUTES_MODEL.HOME.path}
                                element={<Home />}
                            />

                            <Route
                                element={<AuthGuards privateValidation={true} />}>
                                {/* Nos permite proteger las rutas privadas que tiene dentro,  */}
                                <Route
                                    path={`${PRIVATE_ROUTES_MODEL.PRIVATE.path}/*`}
                                    element={<Private />}
                                />
                            </Route>

                            <Route element={<RoleGuard rol="admin" />}>
                                <Route
                                    path="admin"
                                    element={
                                        <h3>
                                            Este es el panel de administrador
                                        </h3>
                                    }
                                />
                            </Route>
                      </RoutesWithNotFound>
                      <ToastContainer />
                    </Provider>
              </Suspense>
              <ReactQueryDevtools />
            </QueryClientProvider>
        </>
  )
}

export default App
