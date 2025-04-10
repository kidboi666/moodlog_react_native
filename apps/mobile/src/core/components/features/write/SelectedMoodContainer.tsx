import React from 'react'
import { useTranslation } from 'react-i18next'

import type { MoodLevel, MoodType } from '@/types/mood.types'
import * as S from './SelectedMoodContainer.styled'

interface Props {
  moodType?: MoodType
  moodLevel?: MoodLevel
}

export const SelectedMoodContainer = ({ moodType, moodLevel }: Props) => {
  const { t } = useTranslation()
  const levelText = moodLevel ? t(`moods.levels.${moodLevel}`) : '??'
  const typeText = moodType ? t(`moods.types.${moodType}`) : '??'

  return (
    <S.ViewContainer>
      <S.XStackContainer>
        <S.MoodLevelText>{levelText}</S.MoodLevelText>
        <S.MoodTypeText>{typeText}</S.MoodTypeText>
      </S.XStackContainer>
    </S.ViewContainer>
  )
}
