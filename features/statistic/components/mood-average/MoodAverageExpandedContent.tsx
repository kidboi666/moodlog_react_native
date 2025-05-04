import { Minimize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { ScrollView, View, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/shared/components'
import { useMood } from '@/shared/store'
import type { ScoreBoard } from '@/shared/types'
import { ProgressGraph } from './ProgressGraph'

interface Props {
  scoreBoard: ScoreBoard
}

export const MoodAverageExpandedContent = ({ scoreBoard }: Props) => {
  const { t } = useTranslation()
  const moods = useMood(state => state.moods)

  let moodTotalScore = 0

  Object.values(scoreBoard).forEach(scoreCount => {
    moodTotalScore += scoreCount?.score || 0
  })

  return (
    <Container>
      <TitleContainer>
        <H3>{t('statistics.mood.title')}</H3>
        <BaseText>{t('statistics.mood.description')}</BaseText>
      </TitleContainer>
      <ScrollView>
        <ContentYStack>
          {Object.entries(scoreBoard).map(([id, countScore]) => {
            const moodScore = Math.round(
              ((countScore?.score || 0) / moodTotalScore) * 100,
            )
            const moodColor = moods[id]?.color || '$gray10'
            return (
              <ProgressGraph
                key={id}
                moodId={id}
                moodScore={moodScore}
                moodColor={moodColor}
              />
            )
          })}
        </ContentYStack>
      </ScrollView>
      <Minimize2 self='flex-end' color='$color8' />
    </Container>
  )
}

const Container = styled(View, {
  flex: 1,
  justify: 'space-between',
  animation: 'quick',
  animateOnly: ['opacity'],
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
  flexDirection: 'column',
  gap: '$4',
})

const TitleContainer = styled(YStack, {
  gap: '$2',
})

const ContentYStack = styled(YStack, {
  gap: '$4',
})
