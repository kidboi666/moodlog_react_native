import { StyleSheet } from 'react-native'

import {
  CurrentMonthCalendar,
  HomeJournalDisplay,
  WelcomeZone,
} from '@/src/features/home/components'
import { useFirstRender, useJournalsByDate } from '@/src/features/home/hooks'
import { ScreenView } from '@/src/shared/components'
import { DELAY_MS } from '@/src/shared/constants'
import { useCalendar } from '@/src/shared/hooks'

export default function HomeScreen() {
  const { selectedDate, onSelectedDateChange } = useCalendar()
  const { journals, isLoading } = useJournalsByDate(selectedDate)
  const { firstRender } = useFirstRender()

  return (
    <ScreenView
      edges={['top']}
      withScroll
      padded
      contentContainerStyle={styles.container}
    >
      <WelcomeZone />
      <CurrentMonthCalendar
        selectedDate={selectedDate}
        onSelectedDateChange={onSelectedDateChange}
      />
      <HomeJournalDisplay
        delay={firstRender ? DELAY_MS.ANIMATION.MEDIUM * 4 : undefined}
        journals={journals}
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
