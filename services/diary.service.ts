import * as Crypto from 'expo-crypto'
import { CalendarUtils } from 'react-native-calendars'

import type {
  Draft,
  ISODateString,
  ISOMonthString,
  Journal,
  JournalIndexes,
  JournalStore,
  MonthKey,
} from '@/types'
import {
  getISODateString,
  getISOMonthString,
  getYearFromISODate,
} from '@/utils'

export const DiaryService = {
  addJournal: (store: JournalStore, draft: Draft): JournalStore => {
    if (!draft.content || !draft.mood) {
      throw new Error('not_content_or_mood')
    }

    const now = new Date()
    const localDate = CalendarUtils.getCalendarDateString(now)

    // 하루에 최대 3개의 일기만 작성할 수 있도록 제한
    const dailyJournalIds = store.indexes.byDate[localDate] || []
    if (dailyJournalIds.length >= 3) {
      throw new Error('daily_journal_limit_exceeded')
    }

    const monthString = getISOMonthString(localDate)
    const year = now.getFullYear()
    const moodName = draft.mood.name

    // 하루에 한 가지 감정만 선택할 수 있도록 제한
    // 오늘 작성된 일기가 있으면 가장 최근 일기의 감정 사용
    if (dailyJournalIds.length > 0) {
      const latestJournalId = dailyJournalIds[dailyJournalIds.length - 1]
      const latestJournal = store.journals[latestJournalId]
      draft.mood = latestJournal.mood
    }

    const newJournal = {
      id: Crypto.randomUUID(),
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
          [moodName]: [
            ...(store.indexes.byMood[moodName] || []),
            newJournal.id,
          ],
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
    const mood = journal.mood.name

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

  getCountForMonth: (
    indexes: JournalIndexes,
    year: number,
    month: number | MonthKey,
  ): number => {
    const monthString = getISOMonthString(year, month)
    return (indexes?.byMonth[monthString] || []).length
  },

  getMoodForDate: (store: JournalStore, date: ISODateString) => {
    const thatDays = store.indexes.byDate[date] || []
    return thatDays.map(day => store.journals[day].mood)
  },

  getJournals: (
    store: JournalStore,
    date: ISODateString | ISOMonthString | null,
  ): Journal[] | ISODateString | null => {
    if (!date) return null
    const splitDate = date.split('-')

    if (splitDate?.[2]) {
      return DiaryService.getJournalsByDate(store, date as ISODateString)
    }
    return DiaryService.getJournalsByMonth(store, date as ISOMonthString)
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
}
