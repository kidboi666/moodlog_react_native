import { CalendarUtils } from 'react-native-calendars'

import {
  ISODateString,
  ISOMonthString,
  Journal,
  JournalIndexes,
  JournalStore,
  SelectedJournals,
} from '@/types'
import { DateUtils } from './date.utils'

export class JournalUtils {
  static getCountForDate(
    year: number,
    month: number | string,
    date: number,
  ): number {
    const dateString = DateUtils.getISODateString(year, month, date)
    return (indexes?.byDate[dateString] || []).length
  }

  static getMoodForDate(store: JournalStore, date: ISODateString) {
    const thatDays = store.indexes.byDate[date] || []
    return thatDays.map(day => store.journals[day].mood)
  }

  static groupJournalsByDate(journals: Journal[]) {
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
  }

  static getJournals(
    store: JournalStore,
    date: ISODateString | ISOMonthString | null,
  ): Journal[] | ISODateString | null {
    if (!date) return null
    const splitDate = date.split('-')

    if (splitDate?.[2]) {
      return JournalUtils.getJournalsByDate(store, date as ISODateString)
    }
    return JournalUtils.getJournalsByMonth(store, date as ISOMonthString)
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

  static syncSelectedJournalsAfterDelete(
    selectedJournals: SelectedJournals,
    excludeId: string,
  ) {
    if (!Array.isArray(selectedJournals)) return selectedJournals
    if (selectedJournals.length === 1) return []
    return selectedJournals.filter(journal => journal.id !== excludeId)
  }

  static syncSelectedJournalsAfterCreate(
    selectedJournals: SelectedJournals,
    newJournal: Journal,
  ) {
    if (!Array.isArray(selectedJournals)) {
      return [newJournal]
    }
    return [...selectedJournals, newJournal]
  }

  static syncSelectedJournalsAfterUpdateStore(
    selectedJournals: SelectedJournals,
    newJournal: Journal,
  ) {
    if (!Array.isArray(selectedJournals)) {
      return [newJournal]
    }
    return selectedJournals.map(journal => {
      if (journal.id === newJournal.id) {
        return newJournal
      }
      return journal
    })
  }

  static canWrite(indexes: JournalIndexes) {
    return !!indexes.byDate[CalendarUtils.getCalendarDateString(new Date())]
      .length
  }
}
