import { uuid } from 'expo-modules-core'
import { CalendarUtils } from 'react-native-calendars'

import type {
  ISODateString,
  ISOMonthString,
  MonthKey,
} from '@/types/date.types'
import type {
  Draft,
  Journal,
  JournalIndexes,
  JournalStore,
} from '@/types/journal.types'
import {
  getISODateString,
  getISOMonthString,
  getYearFromISODate,
} from '@/utils/date'

export class Diary {
  static async addJournal(
    store: JournalStore,
    draft: Draft,
  ): Promise<JournalStore> {
    if (!draft.content || !draft.mood) {
      throw new Error('not content or mood')
    }

    const now = new Date()
    const localDate = CalendarUtils.getCalendarDateString(now)
    const monthString = getISOMonthString(localDate)
    const year = now.getFullYear()
    const moodType = draft.mood.type

    const newJournal = {
      id: uuid.v4(),
      content: draft.content,
      mood: draft.mood,
      createdAt: new Date().toISOString(),
      localDate,
      imageUri: draft.imageUri ? draft.imageUri : [],
    }

    return {
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
        byMood: {
          ...store.indexes.byMood,
          [moodType]: [
            ...(store.indexes.byMood[moodType] || []),
            newJournal.id,
          ],
        },
      },
    }
  }

  static async removeJournal(
    store: JournalStore,
    journalId: string,
  ): Promise<JournalStore> {
    const journal = store.journals[journalId]

    if (!journal) {
      return { journals: store.journals, indexes: store.indexes }
    }

    const date = journal.localDate
    const month = getISOMonthString(date)
    const year = getYearFromISODate(journal.localDate)
    const mood = journal.mood.type

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

    newStore.indexes.byMood[mood] = (
      newStore.indexes.byMood[mood] || []
    ).filter(id => id !== journalId)

    newStore.indexes.byYear[year] = (
      newStore.indexes.byYear[year] || []
    ).filter(id => id !== journalId)

    return newStore
  }

  static getCountForDate(
    indexes: JournalIndexes,
    year: number,
    month: number | string,
    date: number,
  ): number {
    const dateString = getISODateString(year, month, date)
    return (indexes?.byDate[dateString] || []).length
  }

  static getCountForMonth(
    indexes: JournalIndexes,
    year: number,
    month: number | MonthKey,
  ): number {
    const monthString = getISOMonthString(year, month)
    return (indexes?.byMonth[monthString] || []).length
  }

  static getMoodForDate(store: JournalStore, date: ISODateString) {
    const thatDays = store.indexes.byDate[date] || []
    return thatDays.map(day => store.journals[day].mood)
  }

  static getJournals(
    store: JournalStore,
    date: ISODateString | ISOMonthString | null,
  ): Journal[] | ISODateString | null {
    if (!date) return null
    const splitDate = date.split('-')

    if (splitDate?.[2]) {
      return Diary.getJournalsByDate(store, date as ISODateString)
    }
    return Diary.getJournalsByMonth(store, date as ISOMonthString)
  }

  static getJournalsByDate(
    store: JournalStore,
    date: ISODateString,
  ): Journal[] | ISODateString | null {
    const dailyJournalsIndex = store.indexes.byDate[date] || []
    if (dailyJournalsIndex.length === 0) {
      return date
    }
    return dailyJournalsIndex.map(journalIndex => store.journals[journalIndex])
  }

  static getJournalsByMonth(store: JournalStore, monthDate: ISOMonthString) {
    const monthlyJournalsIndex = store.indexes.byMonth[monthDate] || []
    if (monthlyJournalsIndex.length === 0) {
      return null
    }
    return monthlyJournalsIndex.map(
      journalIndex => store.journals[journalIndex],
    )
  }
}
