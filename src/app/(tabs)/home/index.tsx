import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import {
  HomeJournalDisplay,
  WeekDay,
  WelcomeZone,
} from '@/components/features/home'
import { ScreenView } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useCalendar } from '@/hooks'
import { JournalQueries } from '@/queries'

export default function HomeScreen() {
  const { selectedDate, onSelectedDateChange } = useCalendar()
  const [firstRender, setFirstRender] = useState(true)
  const { data, isLoading } = useQuery(
    JournalQueries.getJournalsByDate(selectedDate),
  )
  const selectedDateJournals = data?.filter(
    journal => journal.localDate === selectedDate,
  )
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstRender(false)
    }, DelayMS.ANIMATION.MEDIUM * 4)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <ScreenView
      edges={['top']}
      withScroll
      padded
      contentContainerStyle={styles.container}
    >
      <WelcomeZone />
      <WeekDay
        selectedDate={selectedDate}
        onSelectedDateChange={onSelectedDateChange}
      />
      <HomeJournalDisplay
        firstRender={firstRender}
        journals={selectedDateJournals}
        isLoading={isLoading}
      />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
})
