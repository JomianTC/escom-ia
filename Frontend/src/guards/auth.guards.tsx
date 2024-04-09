import { PRIVATE_ROUTES_MODEL, PUBLIC_ROUTES_MODEL } from '@models/ROUTES'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthGuards ({ privateValidation = false }) {
  // Verificamos si el usuario esta logueado
  // const { loggedIn } = useSelector((state) => state.user)
  const loggedIn = true
  return loggedIn
    ? (
        privateValidation
          ? (
            <Outlet />
            )
          : (
            <Navigate replace to={`/${PRIVATE_ROUTES_MODEL.PRIVATE.path}`} />
            )
      )
    : (
        <Navigate replace to={PUBLIC_ROUTES_MODEL.LOGIN.path} />
      )
}
