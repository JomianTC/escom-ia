import { type LoginUserResponse, type StudentLogged } from '@/types/index'
import { createSlice } from '@reduxjs/toolkit'
import { clearLocalStorage, setLocalStorage } from '../../utilities'

const DEFAULT_INITIAL_STATE: StudentLogged = {
  _id: '',
  loggedIn: false,
  rol: '',
  nombres: '',
  boleta: '',
  foto_perfil: '',
  apellidos: '',
  contrasena: '',
  email_academico: '',
  email_recuperacion: '',
  programa_academico: ''
}
export const USER_KEY = 'user_state'

const initialState = (() => {
  const state = localStorage.getItem(USER_KEY)
  const user = JSON.parse(state)?.value
  return (state != null) ? user : DEFAULT_INITIAL_STATE
})()

type LoginAction = {
  payload: LoginUserResponse
}

// Retorna las acciones del objeto como un objeto
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: LoginAction) => {
      const data = { ...action.payload.user, loggedIn: true, rol: 'student', _id: action.payload.user.boleta }
      setLocalStorage('token', action.payload.token)
      setLocalStorage(USER_KEY, data)
      return data
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
      // console.log(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, update, resetUser, showUserInfo } = userSlice.actions
export default userSlice.reducer
