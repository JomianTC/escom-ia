import { setLocalStorage } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'

export type ValidRoles = 'admin' | 'student' | 'invited' | ''

const DEFAULT_INITIAL_STATE = {
  loggedIn: false,
  rol: ''
}
export const ROL_STATE = 'role_state'

const initialState = (() => {
  const state = localStorage.getItem(ROL_STATE)
  if (state === null) return DEFAULT_INITIAL_STATE
  const user = JSON.parse(state)?.value
  return (state != null) ? user : DEFAULT_INITIAL_STATE
})()

type AuthAction = {
  payload: {
    loggedIn: boolean
    rol: ValidRoles
  }
}

// Retorna las acciones del objeto como un objeto
export const authSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setSession: (state, action: AuthAction) => {
      //   {loggedIn: true, rol: 'student'}
      setLocalStorage(ROL_STATE, action.payload)
      return action.payload
    },
    removeSession: (state) => {
      localStorage.removeItem(ROL_STATE)
      return DEFAULT_INITIAL_STATE
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSession, removeSession } = authSlice.actions
