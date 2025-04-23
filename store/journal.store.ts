import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/constants'
import { DiaryService } from '@/services'
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
// TODO 상태 관리만 하고 예외처리는 서비스에서...
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
        const journals = DiaryService.getJournals(get().store, date)
        set({ selectedJournals: journals })
      },

      addJournal: (draft: Draft) => {
        try {
          set({ isLoading: true, error: null })
          const newJournals = DiaryService.addJournal(get().store, draft)
          set({ store: newJournals })
        } catch (err) {
          console.error('Failed to save journals :', err)
          if (err instanceof Error) {
            set({ error: err })
          } else {
            set({ error: new Error('An unknown error occurred') })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      removeJournal: async (id: string) => {
        try {
          set({ isLoading: true, error: null })
          const newStore = DiaryService.removeJournal(get().store, id)
          set({ store: newStore })
        } catch (err) {
          console.error('Failed to remove journal :', err)
          if (err instanceof Error) {
            set({ error: err })
          } else {
            set({ error: new Error('An unknown error occurred') })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      getCountForDate: (year: number, month: number | string, date: number) => {
        return DiaryService.getCountForDate(
          get().store.indexes || initialIndexes,
          year,
          month,
          date,
        )
      },

      getCountForMonth: (year: number, month: number | MonthKey) => {
        return DiaryService.getCountForMonth(
          get().store.indexes || initialIndexes,
          year,
          month,
        )
      },

      getMoodForDate: (date: ISODateString) => {
        return DiaryService.getMoodForDate(get().store, date)
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
