import { Check } from '@tamagui/lucide-icons'
import React, { memo } from 'react'

import * as S from '@/core/components/features/write/PickerMood.styled'
import { MoodLevel, type MoodType } from '@/types/mood.types'

interface Props {
  moodType: MoodType
  moodLevel: MoodLevel
  isSelected: boolean
  moodColor: string
  onMoodChange: (type: MoodType, level: MoodLevel) => void
  disabled?: boolean
}

export const MoodLevelButton = memo(
  ({
    moodType,
    moodLevel,
    isSelected,
    moodColor,
    onMoodChange,
    disabled = false,
  }: Props) => {
    return (
      <S.MoodLevelButton
        key={moodType + moodLevel}
        moodColor={moodColor}
        onPress={() => !disabled && onMoodChange(moodType, moodLevel)}
        disabled={disabled}
      >
        {isSelected && <Check size='$1' color='white' position='absolute' />}
      </S.MoodLevelButton>
    )
  },
)
