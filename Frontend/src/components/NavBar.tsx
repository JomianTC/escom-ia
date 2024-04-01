import { PRIVATE_ROUTES, PRIVATE_ROUTES_MODEL, PUBLIC_ROUTES_MODEL } from '@models/ROUTES'
import { USER_KEY, resetUser } from '@store/slices/userSlice'
import { clearLocalStorage } from '@utils/index'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

export function NavBar () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function logOut () {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    navigate(`${PUBLIC_ROUTES_MODEL.LOGIN.path}`, { replace: true })
  }
  const navRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const windowEvent = (e: MouseEvent) => {
      if (e.clientY < 200) {
        // navRef.current?.classList.remove('hidden')
        // navRef.current?.classList.add('block')
      } else {
        // navRef.current?.classList.remove('block')
        // navRef.current?.classList.add('hidden')
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
    <nav className={` bg-black border-[1px] border-zinc-100 px-12 py-3 my-0 mx-auto rounded-full ${''} w-fit left-0 right-0 transition-all mt-8 mb-8`} ref={navRef}>
      <ul className='flex gap-6 justify-center items-center'>
        <li >
          <img className='w-8' src="/icons/robot.png" alt="" />
        </li>
        {
          PRIVATE_ROUTES.map((route) => (
            <li key={route.path}>
              <NavLink to={route.navPath} className={({ isActive }: { isActive: boolean }) => `nav__link ${isActive ? 'active' : ''} `} end>
                {route.name}
              </NavLink>
            </li>
          ))

        }
      </ul>
    </nav>
  )
}
