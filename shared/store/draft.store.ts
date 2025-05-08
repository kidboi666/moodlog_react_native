import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/shared/constants'
import type { JournalDraft } from '@/shared/types'

interface StoreState {
  draft: JournalDraft | null
  setDraft: (draft: JournalDraft) => void
}

export const useDraft = create<StoreState>()(
  persist(
    set => ({
      draft: null,
      setDraft: draft => set({ draft }),
    }),
    {
      name: STORAGE_KEY.DRAFT,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        draft: state.draft,
      }),
    },
  ),
)
