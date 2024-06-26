import { type LevelAccess } from '@/types/index'
import { setLocalStorage } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_INITIAL_STATE = {
  loggedIn: false,
  rol: ''
}

const TokenToRole: any = {
  '8s91b88c-cfe0-2048-9488-801d35fdb529': 'admin',
  '8a91328c-cfe0-2148-9318-801d55f7b529': 'student',
  invitado: 'invited'
} as const

export const ROL_STATE = 'role_state'

const initialState = (() => {
  const state = localStorage.getItem(ROL_STATE)
  if (state === null) return DEFAULT_INITIAL_STATE
  const user = JSON.parse(state)?.value
  return (state != null) ? { ...user, rol: TokenToRole[user.rol] } : DEFAULT_INITIAL_STATE
})()

type AuthAction = {
  payload: {
    rol: LevelAccess
  }
}

// Retorna las acciones del objeto como un objeto
export const authSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setSession: (_state, action: AuthAction) => {
      const data = { loggedIn: true, rol: action.payload.rol }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const correctRol = Object.entries(TokenToRole).find(([_, value]) => value === action.payload.rol)
      if (correctRol != null) {
        setLocalStorage(ROL_STATE, { ...data, rol: correctRol[0] })
        return data
      }
    },
    removeSession: (_state) => {
      localStorage.removeItem(ROL_STATE)
      return DEFAULT_INITIAL_STATE
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSession, removeSession } = authSlice.actions
