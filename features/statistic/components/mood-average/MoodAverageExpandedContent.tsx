import { Minimize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, ScrollView, View, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/shared/components'
import { useMood } from '@/shared/store'
import type { ScoreBoard } from '@/shared/types'
import { EmptyContent } from '../EmptyContent'
import { ProgressGraph } from './ProgressGraph'

interface Props {
  scoreBoard: ScoreBoard
  hasSignatureMood: boolean
}

export const MoodAverageExpandedContent = ({
  scoreBoard,
  hasSignatureMood,
}: Props) => {
  if (!hasSignatureMood) {
    return <EmptyContent />
  }

  const { t } = useTranslation()
  const moods = useMood(state => state.moods)

  let moodTotalScore = 0

  Object.values(scoreBoard).forEach(scoreCount => {
    moodTotalScore += scoreCount?.score || 0
  })

  return (
    <Container>
      <YStackContainer>
        <TitleContainer>
          <H3>{t('statistics.mood.title')}</H3>
          <BaseText>{t('statistics.mood.description')}</BaseText>
        </TitleContainer>
        <ScrollView>
          <YStack gap='$4'>
            {Object.entries(scoreBoard).map(([id, countScore], i) => {
              return (
                <ProgressGraph
                  key={`${i}-${id}`}
                  moodId={id}
                  moodScore={Math.round(
                    ((countScore?.score || 0) / moodTotalScore) * 100,
                  )}
                  moodColor={moods[id].color || '$gray10'}
                />
              )
            })}
          </YStack>
        </ScrollView>
        <Button
          icon={Minimize2}
          unstyled
          self='flex-end'
          opacity={0.2}
          scaleIcon={1.5}
        />
      </YStackContainer>
    </Container>
  )
}

const Container = styled(View, {
  animation: 'quick',
  animateOnly: ['opacity'],
  justify: 'space-between',
  flex: 1,
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
})

const YStackContainer = styled(YStack, {
  flex: 1,
  gap: '$4',
  justify: 'space-between',
})

const TitleContainer = styled(YStack, {
  gap: '$2',
})
