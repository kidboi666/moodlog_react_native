import { useTranslation } from 'react-i18next'
import { H3 } from 'tamagui'

import { moodTheme } from '@/core/constants/themes'
import type { MoodType } from '@/types/mood.types'
import * as S from 'src/core/components/features/statistics/mood-average/ProgressGraph.styled'

interface Props {
  moodScore: number
  moodType: MoodType
}

export const ProgressGraph = ({ moodScore, moodType }: Props) => {
  const { t } = useTranslation()

  return (
    <S.GraphContainer>
      <S.GraphNameBox>
        <H3>{t(`moods.types.${moodType}`)}</H3>
        <S.GraphName>{`${Math.floor(moodScore)}%`}</S.GraphName>
      </S.GraphNameBox>
      <S.Progress value={moodScore}>
        <S.ProgressIndicator moodColor={moodTheme[moodType].full} />
      </S.Progress>
    </S.GraphContainer>
  )
}
