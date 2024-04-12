import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { procedureSlice } from './slices/procedureModalSlice'
import { userSlice } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    procedure: procedureSlice.reducer,
    auth: authSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
