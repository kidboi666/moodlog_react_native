import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/constants'
import type { Draft } from '@/types'

interface DraftState {
  draft: Draft | null
  setDraft: (draft: Draft) => void
  removeDraft: () => void
}

export const useDraft = create<DraftState>()(
  persist(
    set => ({
      draft: null,

      setDraft: (draft: Draft) => {
        set({ draft })
      },

      removeDraft: () => {
        set({ draft: null })
      },
    }),
    {
      name: STORAGE_KEY.DRAFT,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
