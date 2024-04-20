import { useNavBarActions } from '@/pages/hooks/useNavBarActions'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { LEVEL_ACCESS } from '@/types/index'
import { NAV_ROUTES } from '@models/ROUTES'
import { NavLink } from 'react-router-dom'
interface NavBarProps {
  children?: React.ReactNode
}
export function NavBar ({ children }: NavBarProps) {
  const { isModalOpen } = useAppSelector((state) => state.ui)

  const { rol } = useAppSelector((state) => state.auth)
  const { handleLogOut, handleToggleNavBar, showNav } = useNavBarActions()
  const showControls = !(rol === LEVEL_ACCESS.INVITED)
  // const show = showNav ? 'block' : 'hidden'
  return (
    <nav className={`  sm:border-[1px] fixed sm:top-0 sm:relative sm:border-primary_100 px-4  sm:px-12 sm:py-3 my-0 mx-auto rounded-full ${''} w-fit left-0 sm:right-0 transition-all mt-8 mb-8 bottom-0  ${isModalOpen ? 'opacity-100 bg-zinc-800/10 ' : 'opacity-100 z-[100]'} `} >
      <ul className={`flex flex-col-reverse sm:flex-row gap-6 justify-center items-center relative ${showNav ? 'active' : ''}`} >
        <li className='absolute bottom-0 sm:relative border-2 border-primary_300 rounded-full bg-bg_200 p-3 cursor-pointer sm:p-0 sm:bg-transparent sm:rounded-none sm:border-none' onClick={ handleToggleNavBar}>
          <img className='w-10 h-12 sm:w-10 sm:h-12' src="/icons/logo.webp" alt="escom_plus_logo" />
        </li>
        {
          NAV_ROUTES.map((route) => (
            <li key={route.path} className='rounded-full border-2 border-primary_300 sm:rounded-none sm:border-0 absolute bottom-0 sm:relative p-2' onClick={handleToggleNavBar} >
              <NavLink to={route.navPath} className={({ isActive }: { isActive: boolean }) => `nav__link ${isActive ? 'active text-primary_300 font-bold' : ''} `} end>
                <span className='hidden sm:block'>{route.name}</span>
                <img className='w-10 h-10 bg-cover sm:hidden invert' src={route.imageUri} alt="escom_plus_logo" />
              </NavLink>
            </li>
          ))
        }
        {showControls && (
          <>
          <button type='button' className='log-out-button rounded-full border-2 p-2 bg-bg_100 sm:border-none absolute bottom-0 sm:relative ' onClick={handleLogOut}>
            <img className='w-8 h-8 sm:w-8 sm:h-8 invert' src='/icons/logout.webp' alt='logout' />
          </button>
          { children }
          </>
        )
        }
      </ul>
    </nav>
  )
}
