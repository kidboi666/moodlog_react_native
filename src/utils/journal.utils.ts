import {
  DateCount,
  DateJournals,
  Journal,
  Maybe,
  SelectedJournals,
} from '@/types'

export class JournalUtils {
  static getCountForDate(journals: Maybe<Journal[]>) {
    if (!journals || journals.length === 0) return {}
    return journals.reduce((acc, journal) => {
      acc[journal.localDate] = (acc[journal.localDate] || 0) + 1
      return acc
    }, {} as DateCount)
  }

  static groupJournalsByDate(journals: Journal[]) {
    const groupedJournals: DateJournals = {}
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

  static syncSelectedJournalsAfterDelete(
    selectedJournals: SelectedJournals,
    excludeId: string,
  ) {
    if (!Array.isArray(selectedJournals)) return selectedJournals
    if (selectedJournals.length === 1) return []
    return selectedJournals.filter(journal => journal.id !== excludeId)
  }
}
