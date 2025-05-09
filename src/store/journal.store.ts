import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/constants'
import {
  JournalIndexes,
  JournalStore,
  SelectedJournal,
  SelectedJournals,
} from '@/types'

interface StoreState {
  store: JournalStore
  selectedJournals: SelectedJournals
  selectedJournal: SelectedJournal

  selectJournal: (journalId: string) => void
  selectJournals: (selectedJournals: SelectedJournals) => void
  updateStore: (store: JournalStore) => void
}

const initialIndexes: JournalIndexes = {
  byMonth: {},
  byDate: {},
  byYear: {},
}

export const useJournal = create<StoreState>()(
  persist(
    set => ({
      store: {
        journals: {},
        indexes: initialIndexes,
      },
      selectedJournals: null,
      selectedJournal: null,

      selectJournal: journalId =>
        set(state => ({ selectedJournal: state.store.journals[journalId] })),
      selectJournals: selectedJournals => set({ selectedJournals }),
      updateStore: store =>
        set(state => ({
          ...state,
          store: {
            ...state.store,
            journals: store.journals,
            indexes: store.indexes,
          },
        })),
    }),
    {
      name: STORAGE_KEY.JOURNAL,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        store: state.store,
      }),
    },
  ),
)
