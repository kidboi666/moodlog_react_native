import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from 'shared/constants'
import type { Draft } from 'shared/types'

interface StoreState {
  draft: Draft | null
  setDraft: (draft: Draft) => void
  removeDraft: () => void
}

export const useDraft = create<StoreState>()(
  persist(
    set => ({
      draft: null,
      setDraft: draft => set({ draft }),
      removeDraft: () => set({ draft: null }),
    }),
    {
      name: STORAGE_KEY.DRAFT,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
