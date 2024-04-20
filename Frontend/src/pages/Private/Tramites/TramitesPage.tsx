import { RoleGuard } from '@/guards'
import { RoutesWithNotFound } from '@/utilities'
import { Route } from 'react-router-dom'
import { CrearTramite } from './CrearTramite'
import { Tramites } from './Tramites'
import { Detalles } from './Detalles'

export function TramitesPage () {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Tramites />} />
      <Route element={<RoleGuard/> }>
        <Route path='crear' element={<CrearTramite />} />
        <Route path='editar/:id' element={<CrearTramite />} />
      </Route>
        <Route path='detalles/:id' element={<Detalles />} />
    </RoutesWithNotFound>
  )
}
