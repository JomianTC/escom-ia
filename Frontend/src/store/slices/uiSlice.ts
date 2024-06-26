import { createSlice } from '@reduxjs/toolkit'
interface UIState {
  isModalOpen: boolean
  isEditMode: boolean
  changeState: boolean
  deleteModalState: boolean
  isDeleteModalOpen: boolean
  infoModal: { id: string, nombre: string, type: string, estado?: boolean }
  isShareModalOpen: boolean
  chatHistory: any[]
  isActivateModalOpen: boolean
  isDeleteCoomentModalOpen: boolean
  isCreateTeacherModalOpen: boolean
  areNotificationsActive: boolean
  commentBoxActive: boolean
}
const DEFAULT_INITIAL_STATE: UIState = {
  isModalOpen: false,
  isEditMode: false,
  changeState: false,
  isDeleteModalOpen: false,
  deleteModalState: false,
  infoModal: { id: '', nombre: '', type: '' },
  isShareModalOpen: false,
  chatHistory: [],
  isActivateModalOpen: false,
  isDeleteCoomentModalOpen: false,
  isCreateTeacherModalOpen: false,
  areNotificationsActive: false,
  commentBoxActive: false
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
      return { ...state, isDeleteModalOpen: false, infoModal: { id: '', nombre: '', type: '' } }
    },
    // Share modal controls
    openShareModal: (state) => {
      return { ...state, isShareModalOpen: true }
    },
    closeShareModal: (state) => {
      return { ...state, isShareModalOpen: false }
    },
    setChatHistory: (state, action) => {
      return { ...state, chatHistory: action.payload }
    },
    openActivateModal: (state) => {
      return { ...state, isActivateModalOpen: true }
    },
    closeActivateModal: (state) => {
      return {
        ...state, isActivateModalOpen: false, infoModal: { id: '', nombre: '', type: '' }
      }
    },
    openDeleteCommentModal: (state) => {
      return { ...state, isDeleteCoomentModalOpen: true }
    },
    closeDeleteCommentModal: (state) => {
      return { ...state, isDeleteCoomentModalOpen: false }
    },
    openCreateTeacherModal: (state) => {
      return { ...state, isCreateTeacherModalOpen: true }
    },
    closeCreateTeacherModal: (state) => {
      return { ...state, isCreateTeacherModalOpen: false }
    },
    activeNotifications: (state, action) => {
      return { ...state, areNotificationsActive: action.payload }
    },
    openCommentBox: (state) => {
      return { ...state, commentBoxActive: true }
    },
    closeCommentBox: (state) => {
      return { ...state, commentBoxActive: false }
    }

  }
})

// Action creators are generated for each case reducer function
export const { showModal, closeModal, setEditMode, changeState, closeDeleteModal, openDeleteModal, setInfoModal, openShareModal, closeShareModal, setChatHistory, openActivateModal, closeActivateModal, closeDeleteCommentModal, openDeleteCommentModal, closeCreateTeacherModal, openCreateTeacherModal, activeNotifications, openCommentBox, closeCommentBox } = uiSlice.actions
