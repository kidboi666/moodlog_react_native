import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { moodTheme } from '@/constants'
import { useApp } from '@/store'
import { MoodType } from '@/types'

import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'
import * as S from './ProgressGraph.styled'

interface Props {
  moodType: MoodType
  moodScore: number
}

export const ProgressGraph = ({ moodType, moodScore }: Props) => {
  const { t } = useTranslation()
  const emotionDisplayType = useApp(state => state.settings.emotionDisplayType)

  const getMoodLabel = useCallback(
    (moodType: MoodType) => {
      if (moodType === MoodType.SIMPLE) {
        return t('common.moods.simple')
      }

      return t(`moods.types.${moodType}`)
    },
    [t],
  )

  const getMoodColor = useCallback((moodType: MoodType) => {
    if (moodType === MoodType.SIMPLE) {
      return '$blue10'
    }

    return moodTheme[moodType]?.full || '$gray10'
  }, [])

  return (
    <S.GraphContainer>
      <S.GraphNameBox>
        <H3>{getMoodLabel(moodType)}</H3>
        <S.GraphName>{`${Math.floor(moodScore)}%`}</S.GraphName>
      </S.GraphNameBox>
      <S.Progress value={moodScore}>
        <S.ProgressIndicator moodColor={getMoodColor(moodType)} />
      </S.Progress>
    </S.GraphContainer>
  )
}
