import { configureStore } from '@reduxjs/toolkit'
import { procedureSlice } from './slices/procedureModalSlice'
import { userSlice } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    procedure: procedureSlice.reducer
  }
})
