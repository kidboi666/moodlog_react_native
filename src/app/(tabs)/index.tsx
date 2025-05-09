import { ScrollView, styled } from 'tamagui'

import {
  HomeJournalDisplay,
  WeekDay,
  WelcomeZone,
} from '@/components/features/home'
import { ViewContainer } from '@/components/shared'
import { useCalendar } from '@/hooks'

export default function HomeScreen() {
  const { selectedDate, onSelectedDateChange } = useCalendar()
  return (
    <ScrollContainer>
      <Container>
        <WelcomeZone />
        <WeekDay
          selectedDate={selectedDate}
          onSelectedDateChange={onSelectedDateChange}
        />
        <HomeJournalDisplay selectedDate={selectedDate} />
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
