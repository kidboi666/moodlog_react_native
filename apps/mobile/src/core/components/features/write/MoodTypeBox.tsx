import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { MoodLevelButton } from '@/core/components/features/write/MoodLevelButton'
import * as S from '@/core/components/features/write/PickerMood.styled'
import { moodTheme } from '@/core/constants/themes'
import { MoodLevel, type MoodType } from '@/types/mood.types'

interface Props {
  moodType: MoodType
  selectedMoodType?: MoodType
  selectedMoodLevel?: MoodLevel
  onMoodChange: (type: MoodType, level: MoodLevel) => void
  disabled?: boolean
}

export const MoodTypeBox = memo(
  ({
    moodType,
    selectedMoodType,
    selectedMoodLevel,
    onMoodChange,
    disabled = false,
  }: Props) => {
    const { t } = useTranslation()
    return (
      <S.MoodTypeContainer>
        <S.MoodLevelContainer>
          {Object.values(MoodLevel).map(level => (
            <MoodLevelButton
              key={`${moodType}-${level}`}
              moodType={moodType}
              moodLevel={level}
              moodColor={moodTheme[moodType][level]}
              isSelected={
                moodType === selectedMoodType && level === selectedMoodLevel
              }
              onMoodChange={onMoodChange}
              disabled={disabled}
            />
          ))}
        </S.MoodLevelContainer>
        <S.SelectedMoodBox key={moodType}>
          <S.SelectedMoodText>
            {t(`moods.types.${moodType}`)}
          </S.SelectedMoodText>
        </S.SelectedMoodBox>
      </S.MoodTypeContainer>
    )
  },
)
