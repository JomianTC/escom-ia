import { PUBLIC_ROUTES_MODEL } from '@/models'
import { removeSession } from '@/store/slices/authSlice'
import { resetUser, USER_KEY } from '@/store/slices/userSlice'
import { clearLocalStorage } from '@/utilities'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function useNavBarActions () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(false)
  function handleLogOut () {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    dispatch(removeSession())
    navigate(`${PUBLIC_ROUTES_MODEL.LOGIN.path}`, { replace: true })
  }
  useEffect(() => {
    const windowEvent = () => {
      setShowNav(false)
    }
    window.addEventListener('resize', windowEvent)
    return () => {
      window.removeEventListener('resize', windowEvent)
    }
  }, [])

  const handleToggleNavBar = () => {
    if (window.innerWidth <= 640) {
      setShowNav(!showNav)
    }
  }

  return (
    { handleLogOut, handleToggleNavBar, showNav }
  )
}
