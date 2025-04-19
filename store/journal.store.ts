import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/constants'
import { Diary } from '@/services'
import type {
  Draft,
  ISODateString,
  ISOMonthString,
  JournalIndexes,
  JournalStore,
  JournalStoreState,
  MonthKey,
} from '@/types'

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

export const useJournal = create<JournalStoreState>()(
  persist(
    (set, get) => ({
      store: initialStore,
      selectedJournals: null,
      selectedJournal: null,
      isLoading: false,
      error: null,

      selectJournal: (journalId: string) => {
        set(state => ({ selectedJournal: state.store.journals[journalId] }))
      },

      selectJournals: (date: ISODateString | ISOMonthString | null) => {
        const journals = Diary.getJournals(get().store, date)
        set({ selectedJournals: journals })
      },

      addJournal: async (draft: Draft) => {
        try {
          set({ isLoading: true, error: null })
          const newJournals = await Diary.addJournal(get().store, draft)
          if ('error' in newJournals) {
            set({ error: newJournals.error })
          } else {
            set({ store: newJournals })
          }
        } catch (err) {
          console.error('Failed to save journals :', err)
          set({ error: err })
        } finally {
          set({ isLoading: false })
        }
      },

      removeJournal: async (id: string) => {
        try {
          set({ isLoading: true, error: null })
          const newStore = await Diary.removeJournal(get().store, id)
          set({ store: newStore })
        } catch (err) {
          console.error('Failed to remove journal :', err)
          set({ error: err })
        } finally {
          set({ isLoading: false })
        }
      },

      getCountForDate: (year: number, month: number | string, date: number) => {
        return Diary.getCountForDate(
          get().store.indexes || initialIndexes,
          year,
          month,
          date,
        )
      },

      getCountForMonth: (year: number, month: number | MonthKey) => {
        return Diary.getCountForMonth(
          get().store.indexes || initialIndexes,
          year,
          month,
        )
      },

      getMoodForDate: (date: ISODateString) => {
        return Diary.getMoodForDate(get().store, date)
      },
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
