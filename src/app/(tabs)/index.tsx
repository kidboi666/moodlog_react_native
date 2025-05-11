import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView, styled } from 'tamagui'

import {
  HomeJournalDisplay,
  WeekDay,
  WelcomeZone,
} from '@/components/features/home'
import { ViewContainer } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useCalendar } from '@/hooks'
import { JournalQueries } from '@/queries'
import { TimeRange } from '@/types'
import { JournalUtils } from '@/utils'

export default function HomeScreen() {
  const { selectedDate, onSelectedDateChange } = useCalendar()
  const [firstRender, setFirstRender] = useState(true)
  const { data: dailyJournals, isLoading } = useQuery(
    JournalQueries.getJournals(TimeRange.DAILY, selectedDate),
  )
  const dateCount = useMemo(
    () => dailyJournals && JournalUtils.getCountForDate(dailyJournals),
    [dailyJournals],
  )
  const selectedDateJournals = dailyJournals?.filter(
    journal => journal.localDate === selectedDate,
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstRender(false)
    }, DelayMS.ANIMATION.MEDIUM[3])
    return () => clearTimeout(timeout)
  }, [])

  return (
    <ScrollContainer>
      <Container>
        <WelcomeZone />
        <WeekDay
          selectedDate={selectedDate}
          onSelectedDateChange={onSelectedDateChange}
          dateCount={dateCount}
        />
        <HomeJournalDisplay
          firstRender={firstRender}
          journals={selectedDateJournals}
          isLoading={isLoading}
        />
      </Container>
    </ScrollContainer>
  )
}

const ScrollContainer = styled(ScrollView, {
  overScrollMode: 'always',
  keyboardShouldPersistTaps: 'handled',
})

const Container = styled(ViewContainer, {
  edges: ['top', 'bottom'],
  padded: true,
  flexDirection: 'column',
  gap: '$4',
})
