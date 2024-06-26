import { Bubble } from '@/pages/Home/components/Bubble'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { setSession } from '@/store/slices/authSlice'
import { LEVEL_ACCESS } from '@/types/index'
import { clearLocalStorage } from '@/utilities'
import { useNavigate } from 'react-router-dom'

type VALID_ROUTES = 'login' | 'register' | 'private'

export function Home () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  clearLocalStorage('token')

  const handleRedirect = (route: VALID_ROUTES) => {
    dispatch(setSession({ rol: LEVEL_ACCESS.INVITED }))
    navigate(`/${route}`)
  }
  return (
        <div className="w-full h-[calc(100vh-40px)] rselative overflow-hidden flex justify-center content-center items-center">
          <div className="relative  z-50 buttons-container flex flex-col gap-6  ">
              <img className='w-56 drop-shadow-2xl shadow-primary_300 ' src="/icons/logoCompleto.webp" alt="" />
                <button
                    onClick={() => { handleRedirect('login') }}
                    className="login-button bg-primary_100 font-bold  text-text_200 px-8 py-2 rounded-full text-3xl"
                >
                    Inicia Sesión
                </button>
                <button
                    onClick={() => { handleRedirect('register') }}
                    className="login-button bg-primary_100 font-bold  text-text_200 px-8 py-2 rounded-full text-3xl"
                >
                    Registro
                </button>
                <button
                    onClick={() => { handleRedirect('private') }}
                    className="login-button bg-primary_100 font-bold  text-text_200 px-8 py-2 rounded-full text-3xl "
                >
                    Invitado
                </button>
                <Bubble index="5" top="0" left="0px" size="w-16 h-16 " />
                <Bubble index="6" top="-80px" left='-60px' size="w-20 h-20 " />
                <Bubble index="8" top="180px" left='-100px' size="w-32 h-32 " />
                <Bubble index="4" top="90px" left='-150px' size="w-64 h-64 " />
                <Bubble index="5" top="110px" left='130px' size="w-48 h-48 " />
                <Bubble index="6" top="180px" left='120px' size="w-20 h-20 " />
                <Bubble index="7" top="-50px" left='80px' size="w-16 h-16 " />
                <Bubble index="8" top="-80px" left='20px' size="w-48 h-48 " />
            </div>
        </div>
  )
}
