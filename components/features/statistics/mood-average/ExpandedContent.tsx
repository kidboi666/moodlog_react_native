import { Minimize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'

import type { MoodType, ScoreBoard } from '@/types'

import { EmptyContent } from '@/components/features/statistics/EmptyContent'
import { ProgressGraph } from '@/components/features/statistics/mood-average/ProgressGraph'
import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'
import * as S from './ExpandedContent.styled'

interface Props {
  scoreBoard: ScoreBoard
  hasSignatureMood: boolean
}

export const ExpandedContent = ({ scoreBoard, hasSignatureMood }: Props) => {
  if (!hasSignatureMood) {
    return <EmptyContent />
  }

  const { t } = useTranslation()

  let moodTotalScore = 0

  Object.values(scoreBoard).forEach(scoreCount => {
    moodTotalScore += scoreCount.score
  })

  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.TitleBox>
          <H3>{t('statistics.mood.title')}</H3>
          <BaseText>{t('statistics.mood.description')}</BaseText>
        </S.TitleBox>
        <S.MoodGraphBox>
          {Object.entries(scoreBoard).map(([type, countScore], i) => (
            <ProgressGraph
              key={i}
              moodType={type as MoodType}
              moodScore={Math.round((countScore.score / moodTotalScore) * 100)}
            />
          ))}
        </S.MoodGraphBox>
        <S.MinimizeButton icon={Minimize2} />
      </S.YStackContainer>
    </S.ViewContainer>
  )
}
