import { ScrollView, YStack, styled } from 'tamagui'

import {
  HomeJournalDisplay,
  WeekDay,
  WelcomeZone,
} from '@/features/home/components'
import { ViewContainer } from '@/shared/components'
import { useSQLiteContext } from 'expo-sqlite'

export default function HomeScreen() {
  const db = useSQLiteContext()
  console.log(db)
  return (
    <ScrollContainer>
      <Container>
        <ContentYStack>
          <WelcomeZone />
          <WeekDay />
          <HomeJournalDisplay />
        </ContentYStack>
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
})

const ContentYStack = styled(YStack, {
  gap: '$4',
})
