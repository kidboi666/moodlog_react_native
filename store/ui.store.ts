import { create } from 'zustand'

interface StoreState {
  isNavigating: boolean
  isLoading: boolean

  setNavigating: (isNavigating: boolean) => void
  setLoading: (isLoading: boolean) => void
}

export const useUI = create<StoreState>(set => ({
  isNavigating: false,
  isLoading: false,

  setNavigating: (isNavigating: boolean) => set({ isNavigating }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}))
