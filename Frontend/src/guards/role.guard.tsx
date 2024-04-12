import { useAppSelector } from '@/store/hooks/useAppSelector'
import { PRIVATE_ROUTES_MODEL } from '@models/ROUTES'
import { Navigate, Outlet } from 'react-router-dom'
type RoleGuardProps = {
  rol?: 'admin' | 'user'
}
export function RoleGuard ({ rol = 'admin' }: RoleGuardProps) {
  // Verificamos si el usuario esta logueado
  const { rol: userRole } = useAppSelector((state) => state.auth)
  return userRole === rol ? <Outlet /> : < Navigate replace to={PRIVATE_ROUTES_MODEL.PRIVATE.navPath} />
}
