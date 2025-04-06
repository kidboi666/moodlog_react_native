import * as S from '@/core/components/features/write/PickerMood.styled';
import { MoodLevel, MoodType } from '@/types/mood.types';
import { Check } from '@tamagui/lucide-icons';
import React, { memo } from 'react';

interface Props {
  moodType: MoodType;
  moodLevel: MoodLevel;
  isSelected: boolean;
  moodColor: string;
  onMoodChange: (type: MoodType, level: MoodLevel) => void;
}

export const MoodLevelButton = memo(
  ({ moodType, moodLevel, isSelected, onMoodChange, moodColor }: Props) => {
    return (
      <S.MoodLevelButton
        key={moodType + moodLevel}
        moodColor={moodColor}
        onPress={() => onMoodChange(moodType, moodLevel)}
        icon={
          isSelected ? (
            <Check
              position="absolute"
              z="$1"
              color={moodLevel === MoodLevel.ZERO ? '$gray10' : '$gray4'}
              size="$1"
            />
          ) : null
        }
      />
    );
  },
);
