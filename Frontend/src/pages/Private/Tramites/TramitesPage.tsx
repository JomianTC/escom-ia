import { RoleGuard } from '@/guards'
import { RoutesWithNotFound } from '@/utilities'
import { Route } from 'react-router-dom'
import { ShareModal } from './components/Modal'
import { CrearTramite } from './CrearTramite'
import { Detalles } from './Detalles'
import { Tramites } from './Tramites'

export function TramitesPage () {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Tramites />} />
      <Route element={<RoleGuard/> }>
        <Route path='crear' element={<CrearTramite />} />
        <Route path='editar/:id' element={<CrearTramite>
          <ShareModal/>
        </CrearTramite>} />
      </Route>
        <Route path='detalles/:id' element={<Detalles />} />
    </RoutesWithNotFound>
  )
}
