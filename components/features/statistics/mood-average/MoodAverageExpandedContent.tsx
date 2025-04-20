import { Minimize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, View, YStack } from 'tamagui'

import { useApp } from '@/store'
import type { ScoreBoard } from '@/types'

import { BaseText, H3 } from '@/components/shared'
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
  const myMoods = useApp(state => state.myMoods)

  let moodTotalScore = 0

  Object.values(scoreBoard).forEach(scoreCount => {
    moodTotalScore += scoreCount?.score || 0
  })

  return (
    <View
      animation='quick'
      animateOnly={['opacity']}
      justify='space-between'
      flex={1}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    >
      <YStack flex={1} gap='$4' justify='space-between'>
        <YStack gap='$2'>
          <H3>{t('statistics.mood.title')}</H3>
          <BaseText>{t('statistics.mood.description')}</BaseText>
        </YStack>
        <YStack flex={1} justify='space-between'>
          {Object.entries(scoreBoard).map(([id, countScore], i) => {
            const mood = myMoods[id]
            return (
              <ProgressGraph
                key={`${i}-${id}`}
                moodId={id}
                moodScore={Math.round(
                  ((countScore?.score || 0) / moodTotalScore) * 100,
                )}
                moodColor={countScore?.color || '$gray10'}
              />
            )
          })}
        </YStack>
        <Button
          icon={Minimize2}
          unstyled
          self='flex-end'
          opacity={0.2}
          scaleIcon={1.5}
        />
      </YStack>
    </View>
  )
}
