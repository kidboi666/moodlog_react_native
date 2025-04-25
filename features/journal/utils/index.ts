import * as Crypto from 'expo-crypto'
import { CalendarUtils } from 'react-native-calendars'

import {
  Draft,
  ISODateString,
  ISOMonthString,
  Journal,
  JournalIndexes,
  JournalStore,
  SelectedJournals,
} from '@/shared/types'
import {
  getISODateString,
  getISOMonthString,
  getYearFromISODate,
} from '@/shared/utils'

export const JournalUtils = {
  createJournal: (store: JournalStore, draft: Draft) => {
    if (!draft.content || !draft.mood) {
      throw new Error('not_content_or_mood')
    }

    const now = new Date()
    const localDate = CalendarUtils.getCalendarDateString(now)
    const monthString = getISOMonthString(localDate)
    const year = now.getFullYear()

    const newJournal = {
      id: Crypto.randomUUID(),
      content: draft.content,
      mood: draft.mood,
      createdAt: new Date().toISOString(),
      localDate,
      imageUri: draft.imageUri ? draft.imageUri : [],
    }

    return {
      newJournal,
      newStore: {
        journals: {
          ...store.journals,
          [newJournal.id]: newJournal,
        },
        indexes: {
          ...store.indexes,
          byYear: {
            ...store.indexes.byYear,
            [year]: [...(store.indexes.byYear[year] || []), newJournal.id],
          },
          byMonth: {
            ...store.indexes.byMonth,
            [monthString]: [
              ...(store.indexes.byMonth[monthString] || []),
              newJournal.id,
            ],
          },
          byDate: {
            ...store.indexes.byDate,
            [localDate]: [
              ...(store.indexes.byDate[localDate] || []),
              newJournal.id,
            ],
          },
        },
      },
    }
  },

  removeJournal: (store: JournalStore, journalId: string): JournalStore => {
    const journal = store.journals[journalId]

    if (!journal) {
      return { journals: store.journals, indexes: store.indexes }
    }

    const date = journal.localDate
    const month = getISOMonthString(date)
    const year = getYearFromISODate(journal.localDate)

    const newStore = {
      journals: { ...store.journals },
      indexes: { ...store.indexes },
    }

    delete newStore.journals[journalId]

    newStore.indexes.byDate[date] = (
      newStore.indexes.byDate[date] || []
    ).filter(id => id !== journalId)

    newStore.indexes.byMonth[month] = (
      newStore.indexes.byMonth[month] || []
    ).filter(id => id !== journalId)

    newStore.indexes.byYear[year] = (
      newStore.indexes.byYear[year] || []
    ).filter(id => id !== journalId)

    return newStore
  },

  getCountForDate: (
    indexes: JournalIndexes,
    year: number,
    month: number | string,
    date: number,
  ): number => {
    const dateString = getISODateString(year, month, date)
    return (indexes?.byDate[dateString] || []).length
  },

  getMoodForDate: (store: JournalStore, date: ISODateString) => {
    const thatDays = store.indexes.byDate[date] || []
    return thatDays.map(day => store.journals[day].mood)
  },

  groupJournalsByDate: (journals: Journal[]) => {
    const groupedJournals: Record<string, Journal[]> = {}

    journals.forEach(journal => {
      const dateKey = journal.localDate

      if (!groupedJournals[dateKey]) {
        groupedJournals[dateKey] = []
      }

      groupedJournals[dateKey].push(journal)
    })

    return Object.entries(groupedJournals).sort(([dateA], [dateB]) =>
      dateB.localeCompare(dateA),
    )
  },

  getJournals: (
    store: JournalStore,
    date: ISODateString | ISOMonthString | null,
  ): Journal[] | ISODateString | null => {
    if (!date) return null
    const splitDate = date.split('-')

    if (splitDate?.[2]) {
      return JournalUtils.getJournalsByDate(store, date as ISODateString)
    }
    return JournalUtils.getJournalsByMonth(store, date as ISOMonthString)
  },

  getJournalsByDate: (
    store: JournalStore,
    date: ISODateString,
  ): Journal[] | ISODateString | null => {
    const dailyJournalsIndex = store.indexes.byDate[date] || []
    if (dailyJournalsIndex.length === 0) {
      return date
    }
    return dailyJournalsIndex.map(journalIndex => store.journals[journalIndex])
  },

  getJournalsByMonth: (store: JournalStore, monthDate: ISOMonthString) => {
    const monthlyJournalsIndex = store.indexes.byMonth[monthDate] || []
    if (monthlyJournalsIndex.length === 0) {
      return null
    }
    return monthlyJournalsIndex.map(
      journalIndex => store.journals[journalIndex],
    )
  },

  syncSelectedJournalsAfterDelete: (
    selectedJournals: SelectedJournals,
    excludeId: string,
  ) => {
    if (!Array.isArray(selectedJournals)) return selectedJournals
    if (selectedJournals.length === 1) return []
    return selectedJournals.filter(journal => journal.id !== excludeId)
  },

  syncSelectedJournalsAfterCreate: (
    selectedJournals: SelectedJournals,
    newJournal: Journal,
  ) => {
    if (!Array.isArray(selectedJournals)) {
      return [newJournal]
    }
    return [...selectedJournals, newJournal]
  },

  syncSelectedJournalsAfterUpdateStore: (
    selectedJournals: SelectedJournals,
    newJournal: Journal,
  ) => {
    if (!Array.isArray(selectedJournals)) {
      return [newJournal]
    }
    return selectedJournals.map(journal => {
      if (journal.id === newJournal.id) {
        return newJournal
      }
      return journal
    })
  },

  canWrite: (indexes: JournalIndexes) => {
    return !!indexes.byDate[CalendarUtils.getCalendarDateString(new Date())]
      .length
  },
}
