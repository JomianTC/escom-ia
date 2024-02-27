import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AuthGuards from './guards/auth.guards';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './models/ROUTES';
import { store } from './store/store';
import RoutesWithNotFound from './utilities/RoutesWithNotFound';
import RoleGuard from './guards/role.guard';
//LAZYLOADING DE LOGIN Y LAS PARTES PRIVADAS

const Login = lazy(() => import('./pages/Login/Login'));
const Private = lazy(() => import('./pages/Private/Private'));

function App() {

  return (
    <>
      <Suspense fallback={<>Loading ...</>}>

        <Provider store={store}>
          <NavBar />
          <h3>Este elemento se visualiza en todas partes</h3>
          <RoutesWithNotFound>
            <Route path="/" element={<Navigate to={PRIVATE_ROUTES.PRIVATE} />} />
            <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />

            <Route element={<AuthGuards privateValidation={true} />} >  {/* Nos permite proteger las rutas privadas que tiene dentro,  */}
              <Route path={`${PRIVATE_ROUTES.PRIVATE}/*`} element={<Private />} />
            </Route>


            <Route element={<RoleGuard rol="ADMIN" />} >
              <Route path="admin" element={<h3>Este es el panel de administrador</h3>} />
            </Route>

          </RoutesWithNotFound>

        </Provider >

      </Suspense>


    </>
  )
}

export default App
