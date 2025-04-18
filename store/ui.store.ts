import { create } from 'zustand'

export interface UIState {
  isNavigating: boolean
  isLoading: boolean
  setNavigating: (isNavigating: boolean) => void
  setLoading: (isLoading: boolean) => void
}

export const useUI = create<UIState>(set => ({
  isNavigating: false,
  isLoading: false,
  setNavigating: (isNavigating: boolean) => set({ isNavigating }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}))
