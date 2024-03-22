import { createSlice } from '@reduxjs/toolkit'
import { clearLocalStorage, setLocalStorage } from '../../utilities'

const DEFAULT_INITIAL_STATE = {
  name: null,
  _id: null,
  loggedIn: false,
  rol: ''
}

const initialState = (() => {
  const state = localStorage.getItem('user_state')
  return state ? JSON.parse(state) : DEFAULT_INITIAL_STATE
})()

export const USER_KEY = 'user_state'

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
      setLocalStorage(USER_KEY, state)
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
      console.log(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, update, resetUser, showUserInfo } = userSlice.actions
export default userSlice.reducer
