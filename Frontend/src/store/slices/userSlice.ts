import { type StudentLogged } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { clearLocalStorage, setLocalStorage } from '../../utilities'

const DEFAULT_INITIAL_STATE: StudentLogged = {
  _id: null,
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
  const state = localStorage.getItem('user_state')
  return (state != null) ? JSON.parse(state) : DEFAULT_INITIAL_STATE
})()

// Retorna las acciones del objeto como un objeto
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name
      state._id = action.payload.id
      state.loggedIn = true
      state.rol = action.payload.rol
      const data = { ...state, ...action.payload }
      // console.log(data)
      setLocalStorage(USER_KEY, data)
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
