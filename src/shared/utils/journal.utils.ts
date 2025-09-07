import {
  DateCount,
  DateJournals,
  ISOMonthString,
  Journal,
  MonthJournals,
} from '@/src/shared/types'

export function getCountForDate(journals: Journal[]) {
  if (!journals || journals.length === 0) return {}
  return journals.reduce((acc, journal) => {
    acc[journal.localDate] = (acc[journal.localDate] || 0) + 1
    return acc
  }, {} as DateCount)
}

export function groupJournalsByDate(journals: Journal[]) {
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

export function groupJournalsByMonth(journals: Journal[]) {
  const groupedJournals: MonthJournals = {}
  journals.forEach(journal => {
    const monthKey = journal.localDate.slice(0, 7) as ISOMonthString
    if (!groupedJournals[monthKey]) {
      groupedJournals[monthKey] = []
    }
    groupedJournals[monthKey].push(journal)
  })
  return groupedJournals
}
