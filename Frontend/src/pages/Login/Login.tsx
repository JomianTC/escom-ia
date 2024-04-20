/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PUBLIC_ROUTES_MODEL } from '@/models'
import { useAppDispatch } from '@/store/hooks/useAppSelector'
import { resetUser, USER_KEY } from '@/store/slices/userSlice'
import { clearLocalStorage } from '@/utilities'
import { FormLayout } from '@layouts/FormLayout'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import { StudentFormLogin } from './Student'

export default function Login () {
  const [form, setForm] = useState(<StudentFormLogin />)
  const [selected, setSelected] = useState('estudiante')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // Si el usuario accede a la ruta de login y ya esta logueado, hacemos que se desloguee
  useEffect(() => {
    clearLocalStorage(USER_KEY)
    dispatch(resetUser())
    navigate(`/${PUBLIC_ROUTES_MODEL.LOGIN.path}`, { replace: true })
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(prev => {
      setForm(prev === 'administrador' ? <StudentFormLogin /> : <AdminLogin />)
      return e.target.value
    })
  }
  return (
        <FormLayout>
            <>
                <img
                    src="/icons/escomNegro.webp"
                    alt="escom plus"
                  className="w-40"
                  loading="lazy"
        />
                        <div className='flex gap-4'>
                  <label className='flex justify-center items-center form-selector'>
                      <span className='text-lg p-2'>Estudiante</span>
                      <input className='input-form-selector' type="radio" onChange={handleChange} value={'estudiante'} checked={selected === 'estudiante' } />
                      <div className='w-6 h-6 rounded-full radio-checked'></div>
                    </label>
                    <label className='flex justify-center items-center form-selector'>
                    <span className='text-lg p-2'>Administrador</span>
                      <input className='input-form-selector' type="radio" value={'administrador'} onChange={handleChange} checked={selected === 'administrador'} />
                      <div className='w-6 h-6 rounded-full radio-checked'></div>
                    </label>
                </div>
                {form}
                <Link to="/register" className="text-primary_300">
                    ¿No tienes una cuenta? ¡Unete Ahora!
                </Link>
                {/* <button onClick={async () => { await startLogin() }}>Login</button> */}
        {/* <button onClick={async () => { await startLogin('ADMIN') }}>LoginUsingRole</button> */}

            </>
        </FormLayout>
  )
}
