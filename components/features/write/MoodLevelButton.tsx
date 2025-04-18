import { Check } from '@tamagui/lucide-icons'
import { memo } from 'react'

import { MoodLevel, type MoodType } from '@/types'

import { PressableButton } from '@/components/shared/PressableButton'
import { GetThemeValueForKey } from 'tamagui'

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
      <PressableButton
        size='$5'
        bg={moodColor as GetThemeValueForKey<'backgroundColor'>}
        onPress={() => !disabled && onMoodChange(moodType, moodLevel)}
        disabled={disabled}
      >
        {isSelected && <Check size='$1' color='white' position='absolute' />}
      </PressableButton>
    )
  },
)
