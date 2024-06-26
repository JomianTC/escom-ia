import { useAppSelector } from '@/store/hooks/useAppSelector'
import { PRIVATE_ROUTES_MODEL, PUBLIC_ROUTES_MODEL } from '@models/ROUTES'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthGuards ({ privateValidation = false }) {
  // Verificamos si el usuario esta logueado
  const { loggedIn }: { loggedIn: boolean } = useAppSelector((state) => state.auth)
  // const loggedIn = true
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
        <Navigate replace to={PUBLIC_ROUTES_MODEL.HOME.path } />
      )
}
