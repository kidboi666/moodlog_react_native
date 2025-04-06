import { MoodTypeBox } from '@/core/components/features/write/MoodTypeBox';
import { MoodLevel, MoodType } from '@/types/mood.types';
import React from 'react';
import * as S from 'src/core/components/features/write/PickerMood.styled';
import { View } from 'tamagui';

interface Props {
  selectedMoodType?: MoodType;
  selectedMoodLevel?: MoodLevel;
  onMoodChange: (type: MoodType, level: MoodLevel) => void;
}

export const PickerMood = ({
  selectedMoodType,
  selectedMoodLevel,
  onMoodChange,
}: Props) => {
  return (
    <View>
      <S.XStackContainer>
        {Object.values(MoodType).map(type => (
          <MoodTypeBox
            key={type}
            moodType={type}
            selectedMoodType={selectedMoodType}
            selectedMoodLevel={selectedMoodLevel}
            onMoodChange={onMoodChange}
          />
        ))}
      </S.XStackContainer>
    </View>
  );
};
