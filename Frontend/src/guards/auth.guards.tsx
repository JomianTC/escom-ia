import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../models/ROUTES";

export default function AuthGuards({ privateValidation = false }) {
    // Verificamos si el usuario esta logueado
    const { loggedIn } = useSelector(state => state.user);
    return loggedIn
        ?
        privateValidation
            ? <Outlet />
            : < Navigate replace to={`/${PRIVATE_ROUTES.PRIVATE}`} />
        :
        < Navigate replace to={PUBLIC_ROUTES.LOGIN} />
}