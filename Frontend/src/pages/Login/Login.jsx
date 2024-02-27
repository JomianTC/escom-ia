import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../models/ROUTES";
import { getCharachter } from "../../services";
import { USER_KEY, login, resetUser } from "../../store/slices/userSlice";
import { clearLocalStorage } from "../../utilities";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Si el usuario accede a la ruta de login y ya esta logueado, hacemos que se desloguee
    useEffect(() => {
        clearLocalStorage(USER_KEY)
        dispatch(resetUser())
        navigate(`/${PUBLIC_ROUTES.LOGIN}`, { replace: true })
    }, [])

    async function startLogin(rol = "") {
        try {
            const data = await getCharachter("302");
            const user = {
                name: data?.name,
                id: data?._id,
                rol: rol,
            }
            dispatch(login(user));
            navigate(`/${PRIVATE_ROUTES.PRIVATE}`, { replace: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3>Este es el Login</h3>
            <button onClick={() => startLogin()}>Login</button>
            <button onClick={() => startLogin("ADMIN")}>LoginUsingRole</button>
        </div>
    )
}