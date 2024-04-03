import { NAV_ROUTES, PUBLIC_ROUTES_MODEL } from '@models/ROUTES'
import { USER_KEY, resetUser } from '@store/slices/userSlice'
import { clearLocalStorage } from '@utils/index'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

export function NavBar () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(true)
  function handleLogOut () {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    navigate(`${PUBLIC_ROUTES_MODEL.LOGIN.path}`, { replace: true })
  }
  const navRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const windowEvent = () => {
      if (showNav) {
        setShowNav(false)
      }
    }
    if (navRef.current !== null) {
      window.addEventListener('resize', windowEvent)
    }
    return () => {
      window.removeEventListener('resize', windowEvent)
    }
  }, [])

  // const show = showNav ? 'block' : 'hidden'

  return (
    <nav className={` sm:bg-black sm:border-[1px] absolute sm:top-0 sm:relative sm:border-zinc-100 px-4  sm:px-12 sm:py-3 my-0 mx-auto rounded-full ${''} w-fit left-0 sm:right-0 transition-all mt-8 mb-8 bottom-0 z-50`} ref={navRef}>
      <ul className={`flex flex-col-reverse sm:flex-row gap-6 justify-center items-center relative ${showNav ? 'active' : ''}`} onClick={ () => { setShowNav(!showNav) } }>
        <li className='absolute bottom-0 sm:relative border-2 border-primary_300 rounded-full bg-bg_200 p-3 cursor-pointer sm:p-0 sm:bg-transparent sm:rounded-none sm:border-none'>
          <img className='w-10 h-12 sm:w-10 sm:h-12' src="/icons/logo.webp" alt="escom_plus_logo" />
        </li>
        {
          NAV_ROUTES.map((route) => (
            <li key={route.path} className='rounded-full border-2 border-primary_300 sm:rounded-none sm:border-0 absolute bottom-0 sm:relative p-2'>
              <NavLink to={route.navPath} className={({ isActive }: { isActive: boolean }) => `nav__link ${isActive ? 'active text-primary_300 font-bold' : ''} `} end>
                <span className='hidden sm:block'>{route.name}</span>
                <img className='w-10 h-10 bg-cover sm:hidden' src={route.imageUri} alt="escom_plus_logo" />
              </NavLink>
            </li>
          ))
        }
        <button type='button' onClick={handleLogOut}>Log Out</button>
      </ul>
    </nav>
  )
}
