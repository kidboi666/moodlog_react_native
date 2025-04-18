import { useTranslation } from 'react-i18next'

import { moodTheme } from '@/constants'
import type { MoodType } from '@/types'

import { H3 } from '@/components/shared/Heading'
import * as S from './ProgressGraph.styled'

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
