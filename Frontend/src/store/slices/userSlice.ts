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

const initialState = (() => {
  const state = localStorage.getItem(USER_KEY)
  if (state === null) return DEFAULT_INITIAL_STATE
  const user = JSON.parse(state)?.value
  return (state != null) ? user : DEFAULT_INITIAL_STATE
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
    login: (state, action) => {
      const payload: LoginAction = action.payload
      const defaultImg = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'

      if (payload.type === 'admin') {
        const data = { ...payload.user.admin, loggedIn: true, rol: 'admin', foto_perfil: defaultImg, nombres: payload.user.admin.nombre, apellidos: '' }
        setLocalStorage('token', payload.user.token)
        setLocalStorage(USER_KEY, data)
        return data
      }

      if (payload.type === 'student') {
        const data = { ...payload.user.usuario, loggedIn: true, rol: 'student', foto_perfil: defaultImg }
        setLocalStorage('token', payload.user.token)
        setLocalStorage(USER_KEY, data)
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

    }
  }
})

// Action creators are generated for each case reducer function
export const { login, update, resetUser, showUserInfo } = userSlice.actions
