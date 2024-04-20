import { createSlice } from '@reduxjs/toolkit'
interface Tramite {
  id: string
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaTermino: string
  estado: boolean
  esInformativo: boolean
  links: string[]
  requerimientos: string[]
}
const DEFAULT_INITIAL_STATE: Tramite = {
  id: '99c32be0-fc7e-465a-9023-d1adf0238674',
  nombre: 'trabajo opcional',
  descripcion: 'Este tramite te ayudara tramitar el servicio social',
  fechaInicio: '2024-02-01T06:00:00.000Z',
  fechaTermino: '2024-03-22T06:00:00.000Z',
  estado: true,
  esInformativo: true,
  links: [],
  requerimientos: []
}

// Retorna las acciones del objeto como un objeto
export const procedureSlice = createSlice({
  name: 'procedure',
  initialState: DEFAULT_INITIAL_STATE,
  reducers: {
    setProcedure: (state, action) => {
      return { ...action.payload }
    },
    clearProcedure: () => {
      return DEFAULT_INITIAL_STATE
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProcedure, clearProcedure } = procedureSlice.actions
