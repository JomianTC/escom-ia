import { lazy } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { PRIVATE_ROUTES } from '../../models/ROUTES'
import RoutesWithNotFound from '../../utilities/RoutesWithNotFound'
import AuthGuards from '../../guards/auth.guards'
import NavBar from '../../components/NavBar'

const style = {
  backgroundColor: 'lightblue'
}

const Dashboard = lazy(async () => await import('./Dashboard/Dashboard'))
const Home = lazy(async () => await import('./Home/Home'))

export default function Private () {
  return (
    <>
            <NavBar />
            {/* <h3>Seccion de rutas privadas</h3>
            <p>Esto se visualiza en todas las rutas privadas </p> */}
            <NavLink to={PRIVATE_ROUTES.HOME}>Home</NavLink>
            <NavLink to={PRIVATE_ROUTES.DASHBOARD}>Dashboard</NavLink>
            <div style={style}>
                <RoutesWithNotFound>
                    <Route path="/" element={<Dashboard />} />
                    <Route element={<AuthGuards privateValidation={false} />}>
                        <Route path={'privadaValidada'} element={<h1>RUTA PRIVADA VALIDADA</h1>} />
                    </Route>
                    <Route path={PRIVATE_ROUTES.HOME} element={<Home />} />
                    <Route path={PRIVATE_ROUTES.DASHBOARD} element={<Dashboard />} />
                </RoutesWithNotFound>
            </div >
        </>
  )
}
