import * as Crypto from 'expo-crypto'
import { CalendarUtils } from 'react-native-calendars'

import { Draft, JournalStore } from '@/shared/types'
import { DateUtils } from '@/shared/utils'

export class JournalService {
  static createJournal(store: JournalStore, draft: Draft) {
    if (!draft.content || !draft.mood) {
      throw new Error('not_content_or_mood')
    }

    const now = new Date()
    const localDate = CalendarUtils.getCalendarDateString(now)
    const monthString = DateUtils.getISOMonthString(localDate)
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
  }

  static removeJournal(store: JournalStore, journalId: string): JournalStore {
    const journal = store.journals[journalId]

    if (!journal) {
      return { journals: store.journals, indexes: store.indexes }
    }

    const date = journal.localDate
    const month = DateUtils.getISOMonthString(date)
    const year = DateUtils.getYearFromISODate(journal.localDate)

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
  }
}
