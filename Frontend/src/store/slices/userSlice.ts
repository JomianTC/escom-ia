import { type LoginAdminResponse, type LoginUserResponse } from '@/types/index'
import { createSlice } from '@reduxjs/toolkit'
import { clearLocalStorage, setLocalStorage } from '../../utilities'

const DEFAULT_INITIAL_STATE = {
  id: '',
  loggedIn: false,
  rol: '',
  nombres: '',
  apellidos: '',
  email_academico: '',
  email_recuperacion: '',
  programa_academico: '',
  boleta: '',
  foto_perfil: '',
  email: '',
  area: ''
}
export const USER_KEY = 'user_state'
const TokenToRole: any = {
  '8s91b88c-cfe0-2048-9488-801d35fdb529': 'admin',
  '8a91328c-cfe0-2148-9318-801d55f7b529': 'student',
  invitado: 'invitado'
} as const
const initialState = (() => {
  const state = localStorage.getItem(USER_KEY)
  if (state === null) return DEFAULT_INITIAL_STATE
  const user = JSON.parse(state)?.value
  return (state != null) ? { ...user, rol: TokenToRole[user.rol] } : DEFAULT_INITIAL_STATE
})()
interface AdminLoginAction {
  user: LoginAdminResponse
  type: 'admin'
}

interface StudentLoginAction {
  user: LoginUserResponse
  type: 'student'
}

interface InvitedLoginAction {
  type: 'invited'
  user: LoginUserResponse
}

// Definimos una unión de los diferentes tipos de acciones de login
type LoginAction = AdminLoginAction | StudentLoginAction | InvitedLoginAction
// Retorna las acciones del objeto como un objeto
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action) => {
      const payload: LoginAction = action.payload
      const defaultImg = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'

      if (payload.type === 'admin') {
        const data = { ...payload.user.admin, loggedIn: true, rol: 'admin', foto_perfil: defaultImg, nombres: payload.user.admin.nombre, apellidos: '' }
        setLocalStorage('token', payload.user.token)
        setLocalStorage(USER_KEY, { ...data, rol: '8s91b88c-cfe0-2048-9488-801d35fdb529' })
        return data
      }

      if (payload.type === 'student') {
        const data = { ...payload.user.usuario, loggedIn: true, rol: 'student', foto_perfil: defaultImg }
        setLocalStorage('token', payload.user.token)
        setLocalStorage(USER_KEY, { ...data, rol: '8a91328c-cfe0-2148-9318-801d55f7b529' })
        return data
      }

      // if (action.payload.usuario.foto_perfil === '') { action.payload.usuario.foto_perfil = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' }
      // const data = { ...action.payload.usuario, loggedIn: true, rol: 'student', id: action.payload.usuario.id }
      // setLocalStorage('token', action.payload.token)
      // setLocalStorage(USER_KEY, data)
      return action.payload.user
    },
    update: (state, action) => {
      const result = { ...state, ...action.payload }
      setLocalStorage(USER_KEY, result)
      return result
    },
    resetUser: () => {
      clearLocalStorage(USER_KEY)
      return DEFAULT_INITIAL_STATE
    },
    showUserInfo: (state, action) => {
      console.log(state)
      console.log(action)
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, update, resetUser, showUserInfo } = userSlice.actions
