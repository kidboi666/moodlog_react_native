import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from 'shared/constants'
import {
  ISODateString,
  ISOMonthString,
  JournalIndexes,
  JournalStore,
  LastJournalCountDate,
  SelectedJournal,
  SelectedJournals,
} from 'shared/types'

interface StoreState {
  store: JournalStore
  selectedJournals: SelectedJournals
  selectedJournal: SelectedJournal
  lastJournalCountDate: LastJournalCountDate
  dailyJournalLimit: number
  dailyJournalCount: number

  selectJournal: (journalId: string) => void
  selectJournals: (selectedJournals: SelectedJournals) => void
  updateStore: (store: JournalStore) => void
  updateDailyJournalCount: (
    lastJournalCountDate: LastJournalCountDate,
    dailyJournalCount: number,
  ) => void
  canWrite: () => boolean
}

const initialIndexes: JournalIndexes = {
  byMonth: {},
  byDate: {},
  byYear: {},
  byMood: {
    happy: [],
    sad: [],
    peace: [],
    angry: [],
  },
}

const initialStore: JournalStore = {
  journals: {},
  indexes: initialIndexes,
}

export const useJournal = create<StoreState>()(
  persist(
    (set, get) => ({
      store: initialStore,
      selectedJournals: null,
      selectedJournal: null,
      lastJournalCountDate: null,
      dailyJournalLimit: 3,
      dailyJournalCount: 0,

      selectJournal: journalId =>
        set(state => ({ selectedJournal: state.store.journals[journalId] })),
      selectJournals: selectedJournals => set({ selectedJournals }),
      updateStore: store => set({ store }),
      updateDailyJournalCount: (lastJournalCountDate, dailyJournalCount) =>
        set({ lastJournalCountDate, dailyJournalCount }),
      canWrite: () => get().dailyJournalCount < get().dailyJournalLimit,
    }),
    {
      name: STORAGE_KEY.JOURNAL,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ store: state.store }),
    },
  ),
)
