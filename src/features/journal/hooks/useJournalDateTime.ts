import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { JournalQueries } from '@/src/data/queries'
import { useApp } from '@/src/data/store'
import { convertTimeToFormat } from '@/src/shared/utils'

export function useJournalDateTime(journalId: number) {
  const timeFormat = useApp(state => state.settings.timeFormat)
  const { data, isLoading, error } = useQuery(
    JournalQueries.getJournalById(journalId),
  )
  const { localDate, createdAt } = data ?? {}

  const date = useMemo(() => {
    if (!localDate) return ''
    const [year, month, day] = localDate.split('-')
    return `${year}. ${month}. ${day}.`
  }, [localDate])

  const time = useMemo(() => {
    if (!createdAt) return ''
    const date = new Date(createdAt)
    return convertTimeToFormat(date, timeFormat)
  }, [createdAt, timeFormat])

  return {
    date,
    time,
    isLoading,
    error,
  }
}
