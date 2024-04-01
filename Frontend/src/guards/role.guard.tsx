import { PRIVATE_ROUTES_MODEL } from '@models/ROUTES'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export function RoleGuard ({ rol }) {
  // Verificamos si el usuario esta logueado
  const userState = useSelector(state => state.user)
  return userState.rol === rol ? <Outlet /> : < Navigate replace to={PRIVATE_ROUTES_MODEL.PRIVATE.navPath} />
}
