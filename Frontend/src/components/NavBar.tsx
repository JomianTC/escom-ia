import { NavLink, useNavigate } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../models/ROUTES'
import { USER_KEY, resetUser } from '../store/slices/userSlice'
import { clearLocalStorage } from '../utilities'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

export default function NavBar () {
  const [showNav, setShowNav] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function logOut () {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    navigate(`${PUBLIC_ROUTES.LOGIN}`, { replace: true })
  }
  const navRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const windowEvent = (e: MouseEvent) => {
      if (e.clientY < 100) {
        navRef.current?.classList.remove('hidden')
        navRef.current?.classList.add('block')
      } else {
        navRef.current?.classList.remove('block')
        navRef.current?.classList.add('hidden')
      }
    }
    if (navRef.current !== null) {
      window.addEventListener('mousemove', windowEvent)
    }
    return () => {
      window.removeEventListener('mousemove', windowEvent)
    }
  }, [])

  // const show = showNav ? 'block' : 'hidden'

  return (
    <nav className={` bg-bg_100 border-4 border-zinc-100 px-4 my-0 mx-auto rounded-lg ${""} w-fit`} ref={navRef}>
      <ul>
        <li className='flex gap-6 justify-center items-center '>
          <NavLink to="/login" className={({ isActive }: { isActive: boolean }) => `nav__link ${isActive ? 'active' : ''} `} end>Login</NavLink>
          <NavLink to={PRIVATE_ROUTES.PRIVATE} className={({ isActive }: { isActive: boolean }) => `nav__link ${isActive ? 'active' : ''} `} end>Ruta private</NavLink>
          <NavLink to="/private/dsjhf" className={({ isActive }: { isActive: boolean }) => `nav__link ${isActive ? 'active' : ''} `} end>Not found (private)</NavLink>
          <button onClick={logOut}>Log out</button>
        </li>
      </ul>
    </nav>
  )
}
