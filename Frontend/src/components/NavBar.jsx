import { NavLink, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../models/ROUTES'
import { USER_KEY, resetUser } from '../store/slices/userSlice'
import { clearLocalStorage } from '../utilities'
import { useDispatch } from 'react-redux'

const NavStyled = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    list-style: none;
    li {
      margin-left: 10px;
      a {
        padding: 1rem;
        color: #fff;
        text-decoration: none;
        &.active {
          color: #00b7ff;
        }
      }
    }
  }
  `
export default function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function logOut() {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    navigate(`${PUBLIC_ROUTES.LOGIN}`, { replace: true })
  }

  return (
    <NavStyled>
      <ul>
        <li>
          <NavLink to="/login" className={({ isActive }) => `nav__link ${isActive ? 'active' : ""} `} end>Login</NavLink>
          <NavLink to={PRIVATE_ROUTES.PRIVATE} className={({ isActive }) => `nav__link ${isActive ? 'active' : ""} `} end>Ruta private</NavLink>
          <NavLink to="/private/dsjhf" className={({ isActive }) => `nav__link ${isActive ? 'active' : ""} `} end>Not found (private)</NavLink>
          <button onClick={logOut}>Log out</button>
        </li>
      </ul>
    </NavStyled>
  )
}