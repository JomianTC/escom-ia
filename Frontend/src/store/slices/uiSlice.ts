import { createSlice } from '@reduxjs/toolkit'
interface Tramite {
  isModalOpen: boolean
  isEditMode: boolean
  changeState: boolean
  deleteModalState: boolean
  isDeleteModalOpen: boolean
  infoModal: string | number | null
}
const DEFAULT_INITIAL_STATE: Tramite = {
  isModalOpen: false,
  isEditMode: false,
  changeState: false,
  isDeleteModalOpen: false,
  deleteModalState: false,
  infoModal: null
}

// Retorna las acciones del objeto como un objeto
export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: DEFAULT_INITIAL_STATE,
  reducers: {
    showModal: (state) => {
      return { ...state, isModalOpen: true }
    },
    closeModal: (state) => {
      return { ...state, isModalOpen: false }
    },
    setEditMode: (state, action) => {
      return { ...state, isEditMode: action.payload }
    },
    changeState: (state) => {
      return { ...state, changeState: !state.changeState }
    },
    // Confirm Delete modal controls
    openDeleteModal: (state) => {
      return { ...state, isDeleteModalOpen: !state.isDeleteModalOpen }
    },
    setInfoModal: (state, action) => {
      return { ...state, infoModal: action.payload }
    },
    closeDeleteModal: (state) => {
      return { ...state, isDeleteModalOpen: false }
    }
  }
})

// Action creators are generated for each case reducer function
export const { showModal, closeModal, setEditMode, changeState, closeDeleteModal, openDeleteModal, setInfoModal } = uiSlice.actions
