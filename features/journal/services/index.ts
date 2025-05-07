import * as Crypto from 'expo-crypto'
import { CalendarUtils } from 'react-native-calendars'

import { Draft, JournalStore } from '@/shared/types'
import { DateUtils } from '@/shared/utils'
import { SQLiteDatabase } from 'expo-sqlite'

export class JournalService {
  private db: SQLiteDatabase

  constructor(db: SQLiteDatabase) {
    this.db = db
  }

  async createJournal(draft: Draft) {
    if (!draft.content || !draft.mood) {
      throw new Error('not_content_or_mood')
    }

    await this.db.runAsync(
      'INSERT INTO journals (content, mood_id, mood_level, image_uri, localDate) VALUES (?, ?, ?, ?, ?)',
      [
        draft.content,
        draft.mood.id,
        draft.mood.level,
        draft.imageUri,
        draft.localDate,
      ],
    )
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
